import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouterState } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { baseLocale, getLocale, direction } from '@joeblew999/remy-ui/locale';
import { DirectionProvider } from '@joeblew999/remy-ui/components/direction';
import { entryBase, notFoundPath } from '../paths';
import { NotFound, ErrorPage } from '../problem';
import '../styles.css';

// Router context: the QueryClient from getRouter (src/router.tsx).
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    links: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  }),
  shellComponent: Document,
  component: Outlet,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

/**
 * The document. Paraglide's locale sets language and direction: the prerendered URL's at build
 * time, the URL's in the browser. Entry lists are always in the base locale, also in a browser
 * whose own language would resolve differently, so hydration matches the static HTML. The
 * not-found pages ship without the app's scripts: they are served at every unknown URL, where the
 * browser's router would resolve a different page and language than the one prerendered.
 */
function Document({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: state => state.location.pathname });
  const entry = pathname === entryBase || pathname.startsWith(`${entryBase}/`);
  const locale = entry ? baseLocale : getLocale();
  return <html lang={locale} dir={direction(locale)}>
    <head><HeadContent /></head>
    <body><DirectionProvider direction={direction(locale)}>{children}</DirectionProvider>{pathname !== notFoundPath && <Scripts />}</body>
  </html>;
}
