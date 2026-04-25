src/
  app/               # Pages, layouts, API routes (App Router)
  components/        # Reusable UI components
  hooks/             # Client-side logic (favorites, history, categories, jokes)
  context/           # Theme context
  lib/
    api/             # API client + endpoints
    server/          # Server helpers with caching
    data.ts          # In-memory joke + category data
    models.ts        # Shared TypeScript models
    constants.ts     # Storage keys + shared constants
    time.ts          # timeAgo + streak utilities
  store/             # Zustand stores (favorites, history, jokes, ritual)
