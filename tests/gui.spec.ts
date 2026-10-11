import { prerenderedAppChecks } from '@joeblew999/remy-ui/app-checks';
import { m } from '@joeblew999/remy-ui/messages';
import { showcaseChecks } from '@joeblew999/remy-showcase/showcase.checks';
import { statusCardChecks } from '@joeblew999/remy-showcase/parts/status-card/card.checks';
import { sitePaths, appPaths } from '../src/paths';
import { product } from '../src/product';
import { remyAuth } from '../src/remy-auth-origin';
import { service } from '../src/service';

// The shared checks every prerendered app passes (@joeblew999/remy-ui/app-checks: no server, entry
// URLs are static lists resolved in the browser), over this app's pages, which are the showcase's
// (src/paths.ts). Site pages (for Google) and app pages (under /app, noindex) never mix.
prerenderedAppChecks({
  service,
  sitePaths,
  appPaths,
  // The home page's words and brand: checked exactly.
  home: { title: locale => m.home_title({ product }, { locale }), description: locale => m.home_description({ product }, { locale }), brand: product },
});

// It shows the showcase's pages, so their checks run too, in their prerendered form (no server functions).
showcaseChecks({ product, rendering: 'prerendered' });

// remy-auth's live status, asked by the browser across origins through remy-auth's contract, and
// only from the origin remy-auth registered (the production origin, remy.config.ts): a local run
// checks that nothing is asked, a run against the deployed app (npm run test -- remote) checks the
// real answer.
const registered = process.env.DEPLOY_ORIGIN;
if (!registered) throw new Error('DEPLOY_ORIGIN comes from remy.config.ts: run the checks through npm run test');
statusCardChecks({ service: 'remy-auth', path: '/app', endpoint: '/api/status', origin: remyAuth, registered });
