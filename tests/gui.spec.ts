import { prerenderedAppChecks } from '@joeblew999/remy-ui/app-checks';

// Every check here is the package's shared set for a prerendered app, including the showcase rows a
// prerendered app can show. Site pages (for Google) and app pages (under /app, noindex) never mix; see the package's paths.js.
prerenderedAppChecks({ service: 'remy-auth-app' });
