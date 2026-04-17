# SearchTides OM Performance Dashboard

Real-time OM performance dashboard pulling data from HSS and Superfeeders SeaTable bases.

## Features

### 4 Main Tabs:

1. **Statuses** - Current month status breakdown by OM
   - Record counts by status
   - LV values by status
   - Tables for all 12 statuses

2. **Built Quota from Previous Month** - Previous month performance
   - Published LV by client and OM
   - Client/OM matrix table
   - Pie chart showing OM contribution distribution

3. **Trends** - Historical analysis (6 or 12 months)
   - Total records per month (line chart + table)
   - Total LV per month (line chart + table)
   - Negotiations count trend
   - Negotiations LV trend
   - Conversion rate: Negotiations → Content Requested

4. **Superfeeders** - Complete duplication of all views above for Superfeeders data

## Setup

### 1. GitHub
Push this folder to a new GitHub repository (can be private).

### 2. Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Select this repository
3. Click **Deploy** (default settings are fine)

### 3. Environment Variables
In Vercel → Project Settings → Environment Variables, add:

| Name | Description |
|------|-------------|
| `HSS_API_TOKEN` | API token for HSS base |
| `SUPERFEEDERS_API_TOKEN` | API token for Superfeeders base |

After adding variables, click **Redeploy**.

### 4. Done
Your dashboard is live at `your-project.vercel.app`

## Data Sources

### HSS Base
- **Table**: `OM`
- **View**: `view_OMdashboard`
- **Key Fields**: `TEAM` (OM name), `CLIENT*`, `STATUS 1`, `LV`, `Prod Month`

### Superfeeders Base
- **Table**: `OM`
- **View**: `SuperFeeder_dashboard OM`
- **Key Fields**: Same as HSS

## Statuses Tracked

- Published
- Pending
- Content Requested
- Ready for Delivery
- Revisions Requested
- Site Approved
- Negotiation
- BO Declined
- Maybe
- Maybe - NHB
- Paused
- Never Heard Back

## Notes

- Data refreshes automatically on page load, or manually via the Refresh button
- Vercel caches API responses for 5 minutes to avoid hitting SeaTable rate limits
- Charts are powered by Chart.js
- Trends tab allows switching between 6 and 12 month views
- All data is aggregated by OM (Outreach Manager) from the `TEAM` field
