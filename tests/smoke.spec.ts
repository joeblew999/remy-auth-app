import { smokeChecks } from '@joeblew999/remy-ui/smoke';
import { sitePaths, appPaths } from '@joeblew999/remy-ui/paths';

// Tier 1, smoke (mise project:test:smoke, and project:test:live after every cf:deploy): the package's
// smoke checks over the shared pages, which are this app's pages.
smokeChecks({ sitePaths, appPaths, hydrate: [''] });
