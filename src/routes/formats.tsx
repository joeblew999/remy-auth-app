import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { localeInfo } from '@joeblew999/remy-ui/locale-info';
import { m } from '@joeblew999/remy-ui/messages';
import { FormatsPage } from '@joeblew999/remy-ui/pages';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// The loader runs at build time in the prerendering Worker and again on client navigation; both
// have the Intl Locale Info methods. No Cloudflare location section: a prerendered page has no request.
export const Route = createFileRoute('/formats')({
  loader: () => ({ info: localeInfo(getLocale()) }),
  head: () => pageHead('/formats', locale => m.formats_title({}, { locale }), locale => m.formats_description({}, { locale })),
  component: Formats,
});
function Formats() {
  const { info } = Route.useLoaderData();
  return <FormatsPage locale={getLocale()} info={info} preferred={usePreferred()} />;
}
