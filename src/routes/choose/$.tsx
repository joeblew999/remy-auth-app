import { createFileRoute, notFound } from '@tanstack/react-router';
import { publicPaths } from '@joeblew999/remy-ui/paths';
import { Entry, entryHead } from '../../entry';

// The un-localized entry URLs (/, /demo, /formats), routed here by the router's rewrite.
export const Route = createFileRoute('/choose/$')({
  beforeLoad: ({ params }) => {
    const path = params._splat ? `/${params._splat}` : '';
    if (!publicPaths.includes(path)) throw notFound();
    return { path };
  },
  head: ({ params }) => entryHead(params._splat ? `/${params._splat}` : ''),
  component: Choose,
});
function Choose() {
  return <Entry path={Route.useRouteContext({ select: context => context.path })} />;
}
