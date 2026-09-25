import { prerenderedAppChecks } from '@joeblew999/remy-ui/app-checks';
import { statusCardChecks } from '@joeblew999/remy-ui/showcase/status-card.checks';

// Every check here is the package's shared set for a prerendered app, including the showcase rows a
// prerendered app can show. Site pages (for Google) and app pages (under /app, noindex) never mix; see the package's paths.js.
prerenderedAppChecks({ service: 'remy-auth-app' });
// remy-auth's live status, asked by the browser across origins through remy-auth's contract, and
// only from the origin remy-auth registered (DEPLOY_ORIGIN): a local run checks that nothing is
// asked, a run against the deployed app (project:test:remote) checks the real answer.
const { REMY_AUTH_ORIGIN, DEPLOY_ORIGIN } = process.env;
if (!REMY_AUTH_ORIGIN || !DEPLOY_ORIGIN) throw new Error('REMY_AUTH_ORIGIN and DEPLOY_ORIGIN come from mise.toml [env]: run the checks through mise');
statusCardChecks({ service: 'remy-auth', path: '/app', endpoint: '/api/status', origin: REMY_AUTH_ORIGIN, registered: DEPLOY_ORIGIN });
