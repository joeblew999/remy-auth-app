import { index, route, type RouteConfig } from '@react-router/dev/routes';
import { publicPaths } from '@joeblew999/remy-ui/paths';
export default [
  index('routes/choose.tsx'),
  ...publicPaths.filter(Boolean).map(path => route(path.slice(1), 'routes/unprefixed.tsx', { id: `choose${path}` })),
  route(':locale', 'routes/home.tsx'),
  route(':locale/demo', 'routes/demo.tsx'),
  route(':locale/formats', 'routes/formats.tsx'),
  route('robots.txt', 'routes/robots.ts'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
