import { createRouter } from '@tanstack/react-router';
import { extractLocaleFromUrl } from '@joeblew999/remy-ui/runtime';
import { publicPaths } from '@joeblew999/remy-ui/paths';
import { localeRewrite } from '@joeblew999/remy-ui/tanstack';
import { entryBase } from './paths';
import { routeTree } from './routeTree.gen';

/** The public entry path ('' for /) of an un-localized entry URL, else undefined. */
function entryPath(url: URL) {
  const path = url.pathname.replace(/\/+$/, '');
  return !extractLocaleFromUrl(url) && publicPaths.includes(path) ? path : undefined;
}
function withPath(url: URL, pathname: string) {
  const out = new URL(url);
  out.pathname = pathname;
  return out;
}

/**
 * One router per render on the server and one in the browser. Routes carry no locale: the
 * shared rewrite de-localizes /es/formats to /formats and localizes links on the way out. Entry
 * URLs would de-localize to the same routes as the base locale's pages (/ and /en), so they are
 * routed to the entry lists under `entryBase` instead, and shown as themselves.
 */
export function getRouter() {
  return createRouter({
    routeTree,
    rewrite: {
      input: ({ url }) => {
        const path = entryPath(url);
        return path === undefined ? localeRewrite.input({ url }) : withPath(url, `${entryBase}${path}`);
      },
      output: ({ url }) => url.pathname === entryBase || url.pathname.startsWith(`${entryBase}/`)
        ? withPath(url, url.pathname.slice(entryBase.length) || '/')
        : localeRewrite.output({ url }),
    },
    // Every in-app Link loads its route's code and data on hover, focus or touch.
    defaultPreload: 'intent',
    scrollRestoration: true,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
