# MADAR Marketing Website - Deploy Notes

## Changes Made

### 1. Fixed "The Real Problem" Section Text
**Before (redundant):**
- Bank Accounts: "Across multiple portals with no unified view" → "No real-time unified view across accounts"
- Invoices: "Managed manually with no systematic tracking" → "No systematic follow-up on overdue invoices"

**After (cleaner):**
- Bank Accounts: "Data trapped in separate bank portals" → "Manual login required for each account — no single dashboard"
- Invoices: "Scattered across spreadsheets and emails" → "Overdue invoices slip through without consistent follow-up"

### 2. Updated Demo Screenshots
Captured fresh screenshots from demo-v2.madar.finance:
- module-cash.png
- module-invoices.png
- module-collections.png
- module-obligations.png
- module-forecast.png

### 3. Added Arabic Version (/ar)
New files created:
- `src/AppAr.tsx` - Main Arabic app component
- `src/sections/HeroAr.tsx` - Arabic hero section
- `src/sections/ProblemAr.tsx` - Arabic problem section
- `src/sections/SolutionAr.tsx` - Arabic solution section
- `src/sections/CompetitiveAr.tsx` - Arabic competitive section
- `src/sections/CTAAr.tsx` - Arabic CTA section
- `src/sections/FooterAr.tsx` - Arabic footer

Features:
- Full RTL (right-to-left) layout support
- Language switcher in top-right corner
- Product modules remain in English (demo has no Arabic)
- Professional Arabic business terminology

### Dependencies Added
- `react-router-dom` - For routing (/ and /ar)

## Build & Deploy

```bash
npm install
npm run build
```

Deploy `dist/` folder to Netlify.

## URLs After Deploy
- English: https://madar.finance/
- Arabic: https://madar.finance/ar
