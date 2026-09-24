import { withObservability } from '@joeblew999/remy-ui/worker';

// A thin Worker in front of the prerendered assets, so this app gets the same request IDs,
// structured logs and /healthz as every Worker built on the shared package.
export default withObservability<Env>('remy-auth-app', (request, env) => env.ASSETS.fetch(request)) satisfies ExportedHandler<Env>;
