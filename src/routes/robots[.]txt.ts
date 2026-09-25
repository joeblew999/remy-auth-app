import { createFileRoute } from '@tanstack/react-router';
import { origin } from '../origin';

// Written to dist/client/robots.txt at build time.
export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => new Response(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }),
    },
  },
});
