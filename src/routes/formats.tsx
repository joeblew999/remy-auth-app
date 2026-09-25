import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { localeInfo } from '@joeblew999/remy-ui/locale-info';
import { m } from '@joeblew999/remy-ui/messages';
import { FormatsPage } from '@joeblew999/remy-ui/pages';
import { PrerenderedFormatsControls, validateSearch, searchDefaults } from '@joeblew999/remy-ui/showcase/search-params';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// The loader runs at build time in the prerendering Worker and again on client navigation; both
// have the Intl Locale Info methods. The device's own location is an app page (/app/location).
export const Route = createFileRoute('/formats')({
  // ?currency, ?count and ?calendar, validated with defaults; defaults are left out of URLs. The
  // prerendered HTML cannot know them, so the controls show the chosen values once hydrated.
  validateSearch,
  search: { middlewares: [stripSearchParams(searchDefaults)] },
  loader: () => ({ info: localeInfo(getLocale()) }),
  head: () => pageHead('/formats', locale => m.formats_title({}, { locale }), locale => m.formats_description({}, { locale })),
  component: Formats,
});
function Formats() {
  const { info } = Route.useLoaderData();
  const locale = getLocale();
  return <FormatsPage locale={locale} info={info} preferred={usePreferred()}
    extras={{ after: <PrerenderedFormatsControls locale={locale} search={Route.useSearch()} /> }} />;
}
