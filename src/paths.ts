import { allPaths, appPaths, sitePaths } from '@joeblew999/remy-showcase/paths';

// This app's pages are the showcase's (it is the prerendered showcase): the site pages (indexed, in the
// sitemap) and the app pages under /app (noindex). Every page, un-localized and in every locale, is
// prerendered (vite.config.ts); the checks run over both lists (tests/).
export { sitePaths, appPaths, allPaths };

/** Where un-localized entry URLs (/, /formats, /app, /app/demo, …) live inside the router (router.tsx). */
export const entryBase = '/choose';

/** The route prerendered into each locale's 404.html (vite.config.ts), shipped without scripts (routes/__root.tsx). */
export const notFoundPath = '/not-found';
