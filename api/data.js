const SERVER = "https://seatable.searchtides.com";

const ALL_STATUSES = [
  "Published",
  "Pending",
  "Content Requested",
  "Ready for Delivery",
  "Revisions Requested",
  "Site Approved",
  "Negotiation",
  "BO Declined",
  "Maybe",
  "Maybe - NHB",
  "Paused",
  "Never Heard Back"
];

// Allowed OMs - normalized for comparison (lowercase, trimmed)
const ALLOWED_OMS_HSS = [
  "alejandro",
  "olivia",
  "jorge",
  "deborah",
  "chisom",
  "camila",
  "debby anfani"
];

const ALLOWED_OMS_SUPERFEEDERS = [
  "alejandro",
  "olivia",
  "jorge",
  "deborah",
  "chisom",
  "jason",
  "camila",
  "debby anfani"
];

async function getAccess(apiToken) {
  const res = await fetch(SERVER + "/api/v2.1/dtable/app-access-token/", {
    headers: { "Authorization": "Token " + apiToken, "Accept": "application/json" }
  });
  const text = await res.text();
  if (!res.ok) throw new Error("getAccess " + res.status + ": " + text.substring(0, 200));
  return JSON.parse(text);
}

async function listRows(access, tableName, viewName) {
  const base = access.dtable_server.endsWith("/") ? access.dtable_server : access.dtable_server + "/";
  const uuid = access.dtable_uuid;
  const tok  = access.access_token;
  let rows = [], start = 0, limit = 1000;

  while (true) {
    let url = base + "api/v2/dtables/" + uuid + "/rows/?table_name=" +
      encodeURIComponent(tableName) + "&limit=" + limit + "&start=" + start + "&convert_keys=true";
    if (viewName && viewName.trim()) url += "&view_name=" + encodeURIComponent(viewName);

    const res = await fetch(url, {
      headers: { "Authorization": "Token " + tok, "Accept": "application/json" }
    });
    const text = await res.text();
    if (!res.ok) throw new Error("listRows(" + tableName + ") " + res.status + ": " + text.substring(0, 200));

    const batch = (JSON.parse(text).rows || []);
    rows = rows.concat(batch);
    if (batch.length < limit) break;
    start += limit;
  }
  return rows;
}

function resolve(val) {
  if (Array.isArray(val)) val = val[0] || null;
  if (val && typeof val === "object") return val.display_value || val.name || null;
  return val || null;
}

function prodMonth() { 
  return new Date().toLocaleString("en-US", { month: "short", year: "numeric" }); 
}

function getPreviousMonth() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function getMonthsBack(count) {
  const months = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push(d.toLocaleString("en-US", { month: "short", year: "numeric" }));
  }
  return months.reverse();
}

function processBaseData(rows, months, allowedOMs) {
  const omData = {};
  const foundOMs = new Set(); // Debug: track all OM names found
  
  for (const row of rows) {
    const om = resolve(row["TEAM"]);
    const client = resolve(row["CLIENT*"]);
    const status = row["STATUS 1"];
    const lv = parseFloat(row["LV"]) || 0;
    const pm = (row["Prod Month"] || "").trim();
    
    if (!om || !status || !ALL_STATUSES.includes(status)) continue;
    
    // Track all OMs found (for debugging)
    foundOMs.add(om);
    
    // Filter by allowed OMs (normalize for comparison)
    const omNormalized = om.toLowerCase().trim();
    if (!allowedOMs.includes(omNormalized)) continue;
    
    if (!omData[om]) {
      omData[om] = {
        name: om,
        currentMonth: {},
        previousMonth: {},
        trends: {},
        clients: {}
      };
    }
    
    const current = prodMonth();
    const previous = getPreviousMonth();
    
    // Current month data by status
    if (pm === current) {
      if (!omData[om].currentMonth[status]) {
        omData[om].currentMonth[status] = { count: 0, lv: 0 };
      }
      omData[om].currentMonth[status].count += 1;
      omData[om].currentMonth[status].lv += lv;
      
      // Track by client for current month
      if (status === "Published" && client) {
        if (!omData[om].clients[client]) omData[om].clients[client] = 0;
        omData[om].clients[client] += lv;
      }
    }
    
    // Previous month data (Published only for Built quota)
    if (pm === previous && status === "Published" && client) {
      if (!omData[om].previousMonth[client]) omData[om].previousMonth[client] = 0;
      omData[om].previousMonth[client] += lv;
    }
    
    // Trends data (last 12 months)
    if (months.includes(pm)) {
      if (!omData[om].trends[pm]) {
        omData[om].trends[pm] = {
          total_count: 0,
          total_lv: 0,
          negotiation_count: 0,
          negotiation_lv: 0,
          content_requested_count: 0
        };
      }
      
      omData[om].trends[pm].total_count += 1;
      omData[om].trends[pm].total_lv += lv;
      
      if (status === "Negotiation") {
        omData[om].trends[pm].negotiation_count += 1;
        omData[om].trends[pm].negotiation_lv += lv;
      }
      
      if (status === "Content Requested") {
        omData[om].trends[pm].content_requested_count += 1;
      }
    }
  }
  
  // Calculate conversion rates for trends
  for (const om in omData) {
    for (const month in omData[om].trends) {
      const neg = omData[om].trends[month].negotiation_count;
      const cr = omData[om].trends[month].content_requested_count;
      omData[om].trends[month].conversion_rate = neg > 0 ? Math.round((cr / neg) * 100) : 0;
    }
  }
  
  return { omData, foundOMs: Array.from(foundOMs).sort() };
}

function buildClientQuotaTable(omData, source) {
  const clients = {};
  
  for (const om in omData) {
    const omClients = source === "previous" 
      ? omData[om].previousMonth 
      : omData[om].clients;
    
    for (const client in omClients) {
      if (!clients[client]) {
        clients[client] = { client, total: 0, oms: {} };
      }
      clients[client].oms[om] = Math.round(omClients[client] * 100) / 100;
      clients[client].total += omClients[client];
    }
  }
  
  // Round totals
  for (const client in clients) {
    clients[client].total = Math.round(clients[client].total * 100) / 100;
  }
  
  return Object.values(clients).sort((a, b) => a.client.localeCompare(b.client));
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");

  const HSS_TOKEN = process.env.HSS_API_TOKEN;
  const SUPERFEEDERS_TOKEN = process.env.SUPERFEEDERS_API_TOKEN;

  if (!HSS_TOKEN || !SUPERFEEDERS_TOKEN) {
    const missing = [
      !HSS_TOKEN && "HSS_API_TOKEN",
      !SUPERFEEDERS_TOKEN && "SUPERFEEDERS_API_TOKEN"
    ].filter(Boolean).join(", ");
    return res.status(500).json({ ok: false, error: "Missing env vars: " + missing });
  }

  try {
    const currentMonth = prodMonth();
    const previousMonth = getPreviousMonth();
    const last12Months = getMonthsBack(12);

    // ── Auth both bases in parallel ──
    const [hssAccess, superAccess] = await Promise.all([
      getAccess(HSS_TOKEN),
      getAccess(SUPERFEEDERS_TOKEN)
    ]);

    // ── Fetch data in parallel ──
    const [hssRows, superRows] = await Promise.all([
      listRows(hssAccess, "OM", "view_OMdashboard"),
      listRows(superAccess, "OM", "SuperFeeder_dashboard OM")
    ]);

    // ── Process both bases ──
    const hssResult = processBaseData(hssRows, last12Months, ALLOWED_OMS_HSS);
    const superResult = processBaseData(superRows, last12Months, ALLOWED_OMS_SUPERFEEDERS);

    // ── Build client quota tables ──
    const hssQuotaPrevious = buildClientQuotaTable(hssResult.omData, "previous");
    const superQuotaPrevious = buildClientQuotaTable(superResult.omData, "previous");

    // ── Format response ──
    const response = {
      ok: true,
      generated: new Date().toISOString(),
      current_month: currentMonth,
      previous_month: previousMonth,
      months: last12Months,
      hss: {
        oms: Object.keys(hssResult.omData).sort(),
        data: hssResult.omData,
        quota_previous: hssQuotaPrevious
      },
      superfeeders: {
        oms: Object.keys(superResult.omData).sort(),
        data: superResult.omData,
        quota_previous: superQuotaPrevious
      },
      statuses: ALL_STATUSES,
      debug: {
        hss_rows: hssRows.length,
        super_rows: superRows.length,
        hss_oms: Object.keys(hssResult.omData).length,
        super_oms: Object.keys(superResult.omData).length,
        hss_found_all_oms: hssResult.foundOMs,
        super_found_all_oms: superResult.foundOMs
      }
    };

    return res.status(200).json(response);

  } catch(err) {
    console.error("OM Dashboard API error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
