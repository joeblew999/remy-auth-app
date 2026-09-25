// Internal router paths that are never public URLs.

/** Where un-localized entry URLs (/, /formats, /app, /app/demo, /app/formats, /app/location) live inside the router (router.tsx). */
export const entryBase = '/choose';

/** The route prerendered into each locale's 404.html (vite.config.ts), shipped without scripts (routes/__root.tsx). */
export const notFoundPath = '/not-found';
