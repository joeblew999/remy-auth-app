import { publicPageChecks, entryChecks, demoChecks, formatsChecks, observabilityChecks } from '@joeblew999/remy-ui/checks';
import { publicPaths } from '@joeblew999/remy-ui/paths';
import { navigationBlockingChecks } from '@joeblew999/remy-ui/showcase/navigation-blocking.checks';
import { preloadChecks } from '@joeblew999/remy-ui/showcase/preload.checks';

// Every check here is the package's, including the showcase rows a prerendered app can show.
publicPageChecks({ paths: publicPaths, prerendered: true });
entryChecks({ paths: publicPaths, mode: 'static' });
demoChecks();
formatsChecks();
observabilityChecks({ service: 'remy-auth-app', paths: publicPaths });
navigationBlockingChecks();
preloadChecks({ serverFn: false });
