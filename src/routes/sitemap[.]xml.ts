import { createFileRoute } from '@tanstack/react-router';
import { sitemapXml, sitemapType } from '@joeblew999/remy-ui/seo';
import { origin } from '../origin';

// The package's sitemap: every site page (paths.js; app pages are noindex) in every locale with its hreflang alternates; written to dist/client/sitemap.xml at build time.
export const Route = createFileRoute('/sitemap.xml')({
  server: { handlers: { GET: () => new Response(sitemapXml({ origin }), { headers: { 'Content-Type': sitemapType } }) } },
});
