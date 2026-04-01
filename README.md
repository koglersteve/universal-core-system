          # universal-core-monorepo

The Universal Core Monorepo contains the full backend + frontend + plugin ecosystem for the Universal Core OS.

This repository includes:

- **universal-core** — backend engines, domain modules, flows, adapters, and API contracts  
- **universal-core-frontend** — Next.js frontend shell for dashboards, status screens, and plugin UIs  
- **plugins** — modular plugin folders that extend the Core OS  
- **scripts** — deployment, migration, and automation scripts

---

universal-core-monorepo/
  universal-core/              # Backend (TypeScript)
    engines/                   # Plans, billing, entitlements, lifecycle, renewal, etc.
    domain/                    # Advertiser, vendor, user subscription domains
    flows/                     # Flow layers (mappings, policies, services)
    adapters/                  # Stripe, ACH, Apple IAP, Google Play
    contracts/                 # API controllers, routes, schemas, events
    utils/                     # Shared helpers
    index.ts                   # Root export facade

  universal-core-frontend/     # Frontend (Next.js)
    src/
      app/                     # App routes
      components/              # UI components
      screens/                 # Feature screens
      lib/                     # API + config
    public/
    next.config.js

  plugins/                     # Plugin ecosystem
    dramanextdoor/
      index.ts
      manifest.json
      db/
      routes/
      services/
      ui/
    HOA meme/
      index.ts
      manifest.json
      db/
      routes/
      services/
      ui/
      assets/
        templates/
          static/
            template-01.png
            template-02.png
            template-03.png
          animated/
            animation-01.json
            animation-02.json
            animation-03.json
    IDLYILY/
      index.ts
      manifest.json
      db/
      routes/
      services/
      ui/
    lafflab/
      index.ts
      manifest.json
      db/
      routes/
      services/
      ui/

  scripts/                     # Deployment + migration scripts
    deploy-backend.sh
    deploy-frontend.sh
    db-migrate.sh



---

## Purpose

This monorepo provides:

- A **unified backend OS** for subscriptions, identity, entitlements, billing, and lifecycle automation  
- A **frontend shell** for dashboards, plugin UIs, and admin tools  
- A **plugin architecture** that allows apps, modules, and industries to extend the system  
- A **deterministic build + deploy pipeline** for Railway or any cloud provider  

---

## Tech Stack

- **Backend:** TypeScript, Node.js, modular engine architecture  
- **Frontend:** Next.js 14 (App Router)  
- **Database:** Prisma ORM  
- **Plugins:** Manifest‑driven, auto‑registered  
- **Deployment:** Railway, Docker, scripts  

---

## Status

This monorepo is actively evolving as the Universal Core OS expands into:

- Subscription engines  
- Identity + authentication  
- Evidence + audit trails  
- Governance + permissions  
- Plugin ecosystems  
- Multi‑app bundles  
- Industry‑specific modules  

---

## Scripts

- `deploy-backend.sh` — deploy backend to Railway  
- `deploy-frontend.sh` — deploy frontend  
- `db-migrate.sh` — run Prisma migrations  

---

## License

Private / Proprietary — Universal Core OS
### LAFFlab Plugin
A cross‑app emotional joke engine with:
- Emotional Link Engine
- Cross‑App Launcher
- Daily Ritual
- Couples Mode
- Premium



