import { linkOptions } from '@tanstack/react-router';
import { defineRemyApp } from '@joeblew999/remy-ui/app-config';
import { showcaseAppNav, showcaseSiteNav } from '@joeblew999/remy-showcase/app-nav';
import { product } from './product';
import { remyAuth } from './remy-auth-origin';
import { service } from './service';
import { sitePaths } from './paths';

// What the shared frame shows for this app: its name and source, the showcase's pages (this app is the
// prerendered showcase; an app with other pages lists its own), and what is deployed, for the Settings
// page: itself, and remy-auth, whose API its status card asks.
export const remyApp = defineRemyApp({
  brand: product,
  service,
  sitePaths,
  repository: 'https://github.com/joeblew999/remy-auth-app',
  deployments: [
    { name: 'production', origin: import.meta.env?.VITE_DEPLOY_ORIGIN ?? 'https://remy-auth-app.gedw99.workers.dev' },
    { name: 'remy-auth', origin: remyAuth, repository: 'https://github.com/joeblew999/remy-auth' },
  ],
  site: { nav: showcaseSiteNav },
  app: { home: linkOptions({ to: '/app' }), nav: showcaseAppNav },
});
