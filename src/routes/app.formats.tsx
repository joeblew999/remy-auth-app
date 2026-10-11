import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { AppFormatsPage } from '@joeblew999/remy-showcase/app-pages';
import { prerenderedChoiceCards, searchDefaults } from '@joeblew999/remy-showcase/search-params';
import { formatsRouteOptions } from '../formats';
import { pageHead } from '../head';

// The formats page inside the app: the same content as the site page, in the app frame.
export const Route = createFileRoute('/app/formats')({
  ...formatsRouteOptions,
  search: { middlewares: [stripSearchParams(searchDefaults)] },
  head: () => pageHead('/app/formats', locale => m.formats_title({}, { locale }), (locale, product) => m.formats_description({ product }, { locale })),
  component: Formats,
});

function Formats() {
  const { info } = Route.useLoaderData();
  const locale = getLocale();
  return <AppFormatsPage locale={locale} info={info} controls={prerenderedChoiceCards({ locale, search: Route.useSearch(), to: '/app/formats' })} />;
}
