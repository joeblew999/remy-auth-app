import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { FontaineTransform } from 'fontaine';
import { prerenderPages } from '@joeblew999/remy-ui/prerender';
import { notFoundPath } from './src/paths.ts';

// TanStack Start, fully prerendered: every public page is rendered once at build time by a
// Start Worker (src/server.ts) and written to dist/client. The deployed Worker is wrangler.jsonc's
// thin observability Worker (workers/app.ts) in front of those files; no page renders per request.
// In development the Start Worker is the entry instead, so `vite dev` renders every route.
const prerenderWorker = { name: 'remy-auth-app-prerender', main: './src/server.ts', compatibility_flags: ['nodejs_compat'] };

// The package's page list: every page (site and app, paths.js) un-localized and in every locale,
// robots.txt and the sitemap written as files, and the localized not-found route as each locale's
// 404.html (Cloudflare serves the nearest one with a 404 status; /404.html is the English fallback).
const pages = prerenderPages({ notFoundPath });

// remy-auth's API answers this app's pages only on the origin remy-auth registered (CORS, its
// src/api/origins.ts): DEPLOY_ORIGIN. So only the build for that origin asks it (cf:deploy builds
// with PUBLIC_ORIGIN = DEPLOY_ORIGIN); local, test and preview builds get no origin and ask nothing.
const remyAuthOrigin = process.env.PUBLIC_ORIGIN && process.env.PUBLIC_ORIGIN === process.env.DEPLOY_ORIGIN ? process.env.REMY_AUTH_ORIGIN ?? '' : '';

export default defineConfig(({ command }) => ({
  plugins: [
    command === 'build'
      ? cloudflare({ experimental: { prerenderWorker: {
        config: (_, { entryWorkerConfig }) => ({ ...prerenderWorker, compatibility_date: entryWorkerConfig.compatibility_date }),
        viteEnvironment: { name: 'ssr' },
      } } })
      : cloudflare({ config: prerenderWorker, viteEnvironment: { name: 'ssr' } }),
    // Fallback faces sized to the web fonts (size-adjust and ascent/descent overrides, as Next.js
    // generates), so the swap to Geist keeps the layout and LCP; fonts.css lists them. Before Tailwind.
    FontaineTransform.vite({ fallbacks: { 'Geist Variable': ['Arial'] } }),
    tailwindcss(),
    tanstackStart({
      // TanStack Start's own option: the stylesheet inlined, so the first paint needs no CSS fetch.
      server: { build: { inlineCss: true } },
      // Retries absorb a preview server that is not ready yet; a page that still fails fails the build.
      prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: false, failOnError: true, retryCount: 2, retryDelay: 1000 },
      pages,
    }),
    viteReact(),
  ],
  // PUBLIC_ORIGIN is the deployed origin for canonical and alternate links, set at build time.
  envPrefix: ['VITE_', 'PUBLIC_'],
  define: { 'import.meta.env.PUBLIC_REMY_AUTH_ORIGIN': JSON.stringify(remyAuthOrigin) },
  server: { host: '127.0.0.1', port: 5174, strictPort: true },
}));
