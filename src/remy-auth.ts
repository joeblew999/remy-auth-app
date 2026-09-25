import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { contract } from '@joeblew999/remy-auth-contract';
import { contractClient } from '@joeblew999/remy-ui/api/client';

/**
 * remy-auth's origin, as this build may ask it: remy-auth answers this app's pages only on the
 * origin it registered (CORS; remy-auth's src/api/origins.ts), which is DEPLOY_ORIGIN, so only the
 * build for that origin gets it (vite.config.ts). Empty in local and preview builds: nothing asks.
 */
export const remyAuthOrigin = import.meta.env.PUBLIC_REMY_AUTH_ORIGIN as string;

/**
 * remy-auth's API through its published contract (@joeblew999/remy-auth-contract): typed by the
 * contract itself, every response parsed against it before use; TanStack Query options from it.
 */
export const remyAuth = createTanstackQueryUtils(contractClient(contract, { url: () => remyAuthOrigin }));
