# ✅ HOTOVO - OM Performance Dashboard

## 📦 Co bylo vytvořeno:

### 1. API Endpoint (`api/data.js`)
- ✅ Připojení k HSS a Superfeeders SeaTable bases
- ✅ Načítání z views: `view_OMdashboard` a `SuperFeeder_dashboard OM`
- ✅ Zpracování všech 12 statusů
- ✅ Agregace dat po OM (pole TEAM)
- ✅ Výpočty pro trendy a konverze

### 2. Frontend Dashboard (`index.html`)
- ✅ **Záložka 1: Statuses** - počty a LV pro každý status (aktuální měsíc)
- ✅ **Záložka 2: Built Quota** - Published LV z předchozího měsíce + koláčový graf
- ✅ **Záložka 3: Trends** - 5 line chartů s tabulkami (přepínač 6/12 měsíců)
  - Total Records per Month
  - Total LV per Month  
  - Negotiations Count
  - Negotiations LV
  - Conversion Rate (Negotiations → Content Requested)
- ✅ **Záložka 4: Superfeeders** - kompletní duplikace všech pohledů

### 3. Deployment soubory
- ✅ `vercel.json` - konfigurace pro Vercel
- ✅ `package.json` - package info
- ✅ `README.md` - dokumentace projektu
- ✅ `.gitignore` - git ignore
- ✅ `DEPLOYMENT.md` - detailní deployment instrukce
- ✅ `setup-github.ps1` - automatický setup script

### 4. Git Repository
- ✅ Git inicializován ve správné složce
- ✅ 2 commity vytvořeny
- ✅ Připraveno k push do GitHub

---

## 🚀 CO MUSÍŠ UDĚLAT:

### Krok 1: Vytvoř GitHub Repository
1. Jdi na: https://github.com/new
2. Název: `om-performance-dashboard` (nebo jiný)
3. **NEvytvářej** README, .gitignore, license
4. Klikni "Create repository"

### Krok 2: Push do GitHub
**ZPŮSOB A - Automaticky (doporučeno):**

Spusť v PowerShell:
```powershell
cd "C:\Users\Majitel\Downloads\Searchtides\Dashboards\OM_performance\OM_performance-dashboard"
.\setup-github.ps1
```
Script tě vyzve k zadání GitHub URL a udělá vše automaticky!

**ZPŮSOB B - Manuálně:**

```powershell
cd "C:\Users\Majitel\Downloads\Searchtides\Dashboards\OM_performance\OM_performance-dashboard"

git remote add origin https://github.com/TVUJ-USERNAME/om-performance-dashboard.git
git branch -M main
git push -u origin main
```

### Krok 3: Deploy na Vercel
1. Jdi na: https://vercel.com/new
2. Import GitHub repository
3. Framework: **Other**
4. Deploy

### Krok 4: Nastav Environment Variables
V Vercel Project Settings → Environment Variables:

| Variable Name | Value |
|---------------|-------|
| `HSS_API_TOKEN` | [tvůj HSS SeaTable API token] |
| `SUPERFEEDERS_API_TOKEN` | [tvůj Superfeeders SeaTable API token] |

**Důležité:** Nastav pro všechna 3 prostředí (Production, Preview, Development)

### Krok 5: Redeploy
Po přidání ENV variables: Deployments → ⋮ → Redeploy

---

## 📍 Důležité informace:

**Environment Variables (musí být přesně tyto názvy):**
- `HSS_API_TOKEN`
- `SUPERFEEDERS_API_TOKEN`

**SeaTable Views:**
- HSS: tabulka `OM`, view `view_OMdashboard`
- Superfeeders: tabulka `OM`, view `SuperFeeder_dashboard OM`

**Klíčové pole:**
- `TEAM` - jméno OM
- `CLIENT*` - klient
- `STATUS 1` - status
- `LV` - link value
- `Prod Month` - měsíc (formát: "Apr 2026")

---

## 📂 Umístění projektu:
```
C:\Users\Majitel\Downloads\Searchtides\Dashboards\OM_performance\OM_performance-dashboard\
```

---

## 🆘 Potřebuješ pomoc?
Čti: `DEPLOYMENT.md` - detailní instrukce
Nebo: `README.md` - dokumentace projektu
