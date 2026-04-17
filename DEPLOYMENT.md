# DEPLOYMENT INSTRUCTIONS

## ✅ Co je hotovo:
- Git repository je inicializován
- Všechny soubory jsou commitnuty
- API endpoint používá správné ENV variables (HSS_API_TOKEN a SUPERFEEDERS_API_TOKEN)

## 🚀 Další kroky pro deployment:

### 1. Vytvoř GitHub repository
1. Jdi na https://github.com/new
2. Pojmenuj ho: `om-performance-dashboard`
3. **NEVYTVÁŘEJ** README, .gitignore ani LICENSE (už máme)
4. Klikni "Create repository"

### 2. Push do GitHub
Po vytvoření repositáře na GitHubu, zkopíruj URL (např. https://github.com/tvuj-username/om-performance-dashboard.git)

Pak v PowerShell spusť:

```powershell
cd "C:\Users\Majitel\Downloads\Searchtides\Dashboards\OM_performance\OM_performance-dashboard"

git remote add origin https://github.com/TVUJ-USERNAME/om-performance-dashboard.git
git branch -M main
git push -u origin main
```

### 3. Deploy na Vercel
1. Jdi na https://vercel.com/new
2. Import GitHub repository: `om-performance-dashboard`
3. **Framework Preset**: Other
4. **Root Directory**: ./
5. **Build Command**: (nech prázdné)
6. **Output Directory**: (nech prázdné)
7. Klikni "Deploy"

### 4. Nastav Environment Variables na Vercelu
Po deploymentu:
1. Jdi do Project Settings → Environment Variables
2. Přidej tyto 2 variables:

| Name | Value | Environment |
|------|-------|-------------|
| `HSS_API_TOKEN` | tvůj HSS SeaTable API token | Production, Preview, Development |
| `SUPERFEEDERS_API_TOKEN` | tvůj Superfeeders SeaTable API token | Production, Preview, Development |

3. Po přidání variables klikni na **Redeploy** (v Deployments → tři tečky → Redeploy)

### 5. Hotovo! 🎉
Dashboard bude dostupný na: `https://tvuj-projekt.vercel.app`

---

## 📝 Struktura projektu:
```
OM_performance-dashboard/
├── api/
│   └── data.js          (API endpoint - načítá data z SeaTable)
├── index.html           (Frontend - 4 záložky dashboardu)
├── vercel.json          (Vercel konfigurace)
├── package.json         (Package info)
├── README.md            (Dokumentace)
├── robots              (No-index pro roboty)
└── .gitignore          (Git ignore soubory)
```

## ⚠️ Důležité:
- API očekává ENV variables: `HSS_API_TOKEN` a `SUPERFEEDERS_API_TOKEN`
- View v HSS: `view_OMdashboard`
- View v Superfeeders: `SuperFeeder_dashboard OM`
- Pole `TEAM` obsahuje jména OM
