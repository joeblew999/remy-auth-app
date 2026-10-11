import { createStart } from '@tanstack/react-start';
import { startMiddleware } from '@joeblew999/remy-ui/start';
import { service } from './service';

// The shared Start middleware (request ID, the nonce CSP, the server function log): @joeblew999/remy-ui/start.
// Here it runs in the prerender Worker, at build time and in `vite dev`; the deployed Worker serves files
// (workers/app.ts), so no header of it reaches a visitor. The package's routes (the CSP report endpoint)
// are typed against it, so every app has it.
export const startInstance = createStart(() => startMiddleware({ service }));
