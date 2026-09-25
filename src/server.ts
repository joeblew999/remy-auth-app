import start from '@tanstack/react-start/server-entry';
import { localizedWorker } from '@joeblew999/remy-ui/tanstack';

// The Start Worker that renders every page at build time (vite.config.ts) and in `vite dev`; it
// is never deployed. The shared wrapper runs Paraglide's middleware, so each prerendered page
// carries its URL's locale. Entry URLs are not redirected (no entryPaths): here they render as
// static lists of every language and the browser moves on (src/entry.tsx).
export default localizedWorker<Env>('remy-auth-app', start, { entryPaths: [] }) satisfies ExportedHandler<Env>;
