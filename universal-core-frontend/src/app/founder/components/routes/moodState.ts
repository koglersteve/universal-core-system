// Frontend-safe placeholder for mood state routes.
// Your backend should expose real endpoints; this file simply
// provides typed helpers for the frontend.

export const moodStateRoutes = {
  list: "/api/mood",
  get: (id: string) => `/api/mood/${id}`,
  update: (id: string) => `/api/mood/${id}`,
};
