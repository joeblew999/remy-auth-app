import { remyApp } from '@joeblew999/remy-ui/app/vite';
import { prerenderPages } from '@joeblew999/remy-ui/prerender';
import { allPaths, notFoundPath } from './src/paths.ts';
import { remyAuth } from './src/remy-auth-origin.ts';

// The shared app configuration (@joeblew999/remy-ui/app/vite), fully prerendered: every public page is
// rendered once at build time by a Start Worker (src/server.ts) and written to dist/client. The
// deployed Worker is wrangler.jsonc's thin observability Worker (workers/app.ts) in front of those
// files; no page renders per request. In development the Start Worker is the entry instead, so
// `vite dev` renders every route.
const prerenderWorker = { name: 'remy-auth-app-prerender', main: './src/server.ts', compatibility_flags: ['nodejs_compat'] };

// remy-auth's API answers this app's pages only on the origin remy-auth registered (CORS, its
// src/api/origins.ts): the production origin (remy.config.ts). So only the build for that origin asks
// it (the deploy builds with PUBLIC_ORIGIN = DEPLOY_ORIGIN); local, test and preview builds get no
// origin and ask nothing.
const remyAuthOrigin = process.env.PUBLIC_ORIGIN && process.env.PUBLIC_ORIGIN === process.env.DEPLOY_ORIGIN ? remyAuth : '';

export default ({ command }: { command: string }) => ({
  ...remyApp({
    port: 5174,
    cloudflare: command === 'build'
      // The build: the entry Worker is wrangler.jsonc's (its own environment), the prerender Worker renders the pages.
      ? { viteEnvironment: undefined, experimental: { prerenderWorker: {
          config: (_: unknown, { entryWorkerConfig }: { entryWorkerConfig: { compatibility_date?: string } }) => ({ ...prerenderWorker, compatibility_date: entryWorkerConfig.compatibility_date }),
          viteEnvironment: { name: 'ssr' },
        } } }
      : { config: prerenderWorker },
    start: {
      // Retries absorb a preview server that is not ready yet; a page that still fails fails the build.
      prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: false, failOnError: true, retryCount: 2, retryDelay: 1000 },
      // The package's page list: every page un-localized and in every locale, robots.txt and the sitemap
      // written as files, and the localized not-found route as each locale's 404.html (Cloudflare serves
      // the nearest one with a 404 status; /404.html is the English fallback).
      pages: prerenderPages({ notFoundPath, paths: allPaths }),
    },
  }),
  // PUBLIC_ORIGIN is the deployed origin for canonical and alternate links, set at build time.
  envPrefix: ['VITE_', 'PUBLIC_'],
  define: { 'import.meta.env.PUBLIC_REMY_AUTH_ORIGIN': JSON.stringify(remyAuthOrigin) },
});
