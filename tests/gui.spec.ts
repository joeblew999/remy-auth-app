import { publicPageChecks, entryChecks, demoChecks, formatsChecks } from '@joeblew999/remy-ui/checks';
import { publicPaths } from '../app/paths';

// Every check here is the package's; this app adds no rows beyond the shared formats subset.
publicPageChecks({ paths: publicPaths, prerendered: true });
entryChecks({ paths: publicPaths, mode: 'static' });
demoChecks();
formatsChecks();
