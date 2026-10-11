import { createFileRoute } from '@tanstack/react-router';
import { sitemapXml, sitemapType } from '@joeblew999/remy-ui/seo';
import { origin } from '../origin';
import { sitePaths } from '../paths';

// The package's sitemap over this app's site pages (app pages are noindex), each in every locale with its
// hreflang alternates, on the build-time public origin; written to dist/client/sitemap.xml at build time.
// The app's own route, not the seo-routes part: the part answers with the request's origin, which is the
// prerender server's here.
export const Route = createFileRoute('/sitemap.xml')({
  server: { handlers: { GET: () => new Response(sitemapXml({ origin, paths: sitePaths }), { headers: { 'Content-Type': sitemapType } }) } },
});
