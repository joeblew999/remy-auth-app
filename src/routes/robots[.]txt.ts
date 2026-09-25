import { createFileRoute } from '@tanstack/react-router';
import { robotsTxt, robotsType } from '@joeblew999/remy-ui/seo';
import { origin } from '../origin';

// Written to dist/client/robots.txt at build time.
export const Route = createFileRoute('/robots.txt')({
  server: { handlers: { GET: () => new Response(robotsTxt(origin), { headers: { 'Content-Type': robotsType } }) } },
});
