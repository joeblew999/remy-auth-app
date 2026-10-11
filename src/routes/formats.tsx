import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { FormatsPage } from '@joeblew999/remy-showcase/pages';
import { prerenderedChoiceCards, searchDefaults } from '@joeblew999/remy-showcase/search-params';
import { formatsRouteOptions } from '../formats';
import { pageHead } from '../head';

// The formats site page. The device's own location is an app page (/app/location).
export const Route = createFileRoute('/formats')({
  ...formatsRouteOptions,
  search: { middlewares: [stripSearchParams(searchDefaults)] },
  head: () => pageHead('/formats', locale => m.formats_title({}, { locale }), (locale, product) => m.formats_description({ product }, { locale })),
  component: Formats,
});

function Formats() {
  const { info } = Route.useLoaderData();
  const locale = getLocale();
  return <FormatsPage locale={locale} info={info} controls={prerenderedChoiceCards({ locale, search: Route.useSearch(), to: '/formats' })} />;
}
