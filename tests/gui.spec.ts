import { zoneChecks, publicPageChecks, entryChecks, demoChecks, formatsChecks, textChecks, observabilityChecks } from '@joeblew999/remy-ui/checks';
import { sitePaths, appPaths, allPaths } from '@joeblew999/remy-ui/paths';
import { navigationBlockingChecks } from '@joeblew999/remy-ui/showcase/navigation-blocking.checks';
import { preloadChecks } from '@joeblew999/remy-ui/showcase/preload.checks';
import { searchParamsChecks } from '@joeblew999/remy-ui/showcase/search-params.checks';
import { devicePlaceChecks } from '@joeblew999/remy-ui/showcase/device-place.checks';

// Every check here is the package's, including the showcase rows a prerendered app can show.
// Site pages (for Google) and app pages (under /app, noindex) never mix; see the package's paths.js.
zoneChecks({ sitePaths, appPaths });
publicPageChecks({ paths: sitePaths, prerendered: true });
entryChecks({ paths: allPaths, mode: 'static' });
demoChecks();
formatsChecks();
textChecks({ paths: allPaths });
observabilityChecks({ service: 'remy-auth-app', paths: allPaths });
navigationBlockingChecks();
preloadChecks({ serverFn: false });
searchParamsChecks({ serverRendered: false });
devicePlaceChecks({ path: '/app/location' });
