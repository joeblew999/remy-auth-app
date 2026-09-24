import { publicPageChecks, entryChecks, demoChecks, formatsChecks, observabilityChecks } from '@joeblew999/remy-ui/checks';
import { publicPaths } from '@joeblew999/remy-ui/paths';

// Every check here is the package's; this app adds no rows beyond the shared formats subset.
publicPageChecks({ paths: publicPaths, prerendered: true });
entryChecks({ paths: publicPaths, mode: 'static' });
demoChecks();
formatsChecks();
observabilityChecks({ service: 'remy-auth-app', paths: publicPaths });
