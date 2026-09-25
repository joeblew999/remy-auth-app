import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { FontaineTransform } from 'fontaine';
import { baseLocale, locales, localizeHref } from '@joeblew999/remy-ui/runtime';
import { publicPaths } from '@joeblew999/remy-ui/paths';
import { notFoundPath } from './src/paths.ts';

// TanStack Start, fully prerendered: every public page is rendered once at build time by a
// Start Worker (src/server.ts) and written to dist/client. The deployed Worker is wrangler.jsonc's
// thin observability Worker (workers/app.ts) in front of those files; no page renders per request.
// In development the Start Worker is the entry instead, so `vite dev` renders every route.
const prerenderWorker = { name: 'remy-auth-app-prerender', main: './src/server.ts', compatibility_flags: ['nodejs_compat'] };

// Every public path in every locale, from Paraglide's URL patterns (localizeHref), plus the
// un-localized entry lists; robots.txt and the sitemap are server routes written as files.
// The localized not-found route becomes each locale's 404.html: Cloudflare serves the nearest
// one with a 404 status (not_found_handling "404-page"), and /404.html is the English fallback.
const pages = [
  ...publicPaths.map(path => ({ path: path || '/' })),
  ...locales.flatMap(locale => publicPaths.map(path => ({ path: localizeHref(path || '/', { locale }) }))),
  { path: '/robots.txt' }, { path: '/sitemap.xml' },
  ...locales.map(locale => ({
    path: localizeHref(notFoundPath, { locale }),
    prerender: { outputPath: locale === baseLocale ? '/404.html' : `/${locale}/404.html` },
  })),
];

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
      // Retries absorb a preview server that is not ready yet; a page that still fails fails the build.
      prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: false, failOnError: true, retryCount: 2, retryDelay: 1000 },
      pages,
    }),
    viteReact(),
  ],
  // PUBLIC_ORIGIN is the deployed origin for canonical and alternate links, set at build time.
  envPrefix: ['VITE_', 'PUBLIC_'],
  server: { host: '127.0.0.1', port: 5174, strictPort: true },
}));
