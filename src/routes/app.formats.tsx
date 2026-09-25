import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { AppFormatsPage } from '@joeblew999/remy-ui/app-pages';
import { prerenderedChoiceCards, searchDefaults } from '@joeblew999/remy-ui/showcase/search-params';
import { formatsRouteOptions } from '../formats';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// The formats page inside the app: the same content as the site page, in the app frame.
export const Route = createFileRoute('/app/formats')({
  ...formatsRouteOptions,
  search: { middlewares: [stripSearchParams(searchDefaults)] },
  head: () => pageHead('/app/formats', locale => m.formats_title({}, { locale }), locale => m.formats_description({}, { locale })),
  component: Formats,
});
function Formats() {
  const { info } = Route.useLoaderData();
  const locale = getLocale();
  return <AppFormatsPage locale={locale} info={info} preferred={usePreferred()}
    controls={prerenderedChoiceCards({ locale, search: Route.useSearch(), to: '/app/formats' })} />;
}
