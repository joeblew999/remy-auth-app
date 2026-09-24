import type { Config } from '@react-router/dev/config';
import { locales, localizeUrl } from '@joeblew999/remy-ui/runtime';
import { publicPaths } from './app/paths';

// Client rendering with every public page prerendered at build time, so the initial HTML
// carries the content and metadata Google's checks look for. See .plans/app.md.
const entries = publicPaths.map(path => path || '/');
export default {
  ssr: false,
  prerender: [
    ...entries,
    ...locales.flatMap(locale => entries.map(path => localizeUrl(new URL(path, 'http://localhost'), { locale }).pathname)),
    '/robots.txt', '/sitemap.xml',
  ],
} satisfies Config;
