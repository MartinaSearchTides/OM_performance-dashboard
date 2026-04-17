# ✅ KÓD JE NA GITHUBU!

## 🎉 Push byl úspěšný!

GitHub URL: https://github.com/MartinaSearchTides/OM_performance-dashboard

---

## 🚀 NYNÍ MUSÍŠ UDĚLAT V VERCELU:

### Krok 1: Jdi do Vercel projektu
URL: https://om-performance-dashboard.vercel.app

Nebo jdi na: https://vercel.com/martinasearchtides/om-performance-dashboard

### Krok 2: Smaž STARÉ environment variables

Jdi do: **Settings → Environment Variables**

**SMAŽ tyto staré variables (pokud tam jsou):**
- ❌ `OM_API_TOKEN`
- ❌ `LBT_API_TOKEN`
- ❌ `CMS_API_TOKEN`
- ❌ `REPORTING_API_TOKEN`

### Krok 3: Přidej NOVÉ environment variables

Klikni **Add** a přidej tyto 2 variables:

#### Variable 1:
- **Name**: `HSS_API_TOKEN`
- **Value**: [tvůj HSS SeaTable API token]
- **Environment**: Production, Preview, Development (zaškrtni všechny 3)

#### Variable 2:
- **Name**: `SUPERFEEDERS_API_TOKEN`
- **Value**: [tvůj Superfeeders SeaTable API token]
- **Environment**: Production, Preview, Development (zaškrtni všechny 3)

### Krok 4: Redeploy

Po přidání variables:
1. Jdi do **Deployments**
2. Najdi poslední deployment
3. Klikni na **⋮** (tři tečky)
4. Klikni **Redeploy**
5. Vyber **Use existing Build Cache** (není potřeba)
6. Klikni **Redeploy**

### Krok 5: Zkontroluj

Po deploymentu (zabere 1-2 minuty):
1. Otevři: https://om-performance-dashboard.vercel.app
2. Měl by se načíst dashboard s novými 4 záložkami:
   - **Statuses**
   - **Built Quota from Previous Month**
   - **Trends**
   - **Superfeeders**

---

## 📋 Checklist:

- [x] Kód pushnut na GitHub
- [ ] Staré ENV variables smazány ve Vercelu
- [ ] Nové ENV variables přidány (`HSS_API_TOKEN`, `SUPERFEEDERS_API_TOKEN`)
- [ ] Redeploy proveden
- [ ] Dashboard funguje

---

## ⚠️ Pokud vidíš chybu:

### "Missing env vars: HSS_API_TOKEN, SUPERFEEDERS_API_TOKEN"
→ ENV variables nejsou nastavené nebo jsou ve špatném prostředí

### 404 NOT FOUND
→ Redeploy ještě neproběhl, počkej 1-2 minuty

### "getAccess error 403"
→ API token je špatný nebo neplatný

---

## 🎯 Finální URL:
Dashboard: https://om-performance-dashboard.vercel.app
GitHub: https://github.com/MartinaSearchTides/OM_performance-dashboard

Hotovo! 🚀
