import { localeInfo } from '@joeblew999/remy-ui/locale-info';
import { m } from '@joeblew999/remy-ui/messages';
import { FormatsPage } from '@joeblew999/remy-ui/pages';
import { requireLocale } from '@joeblew999/remy-ui/react-router';
import { useSuggestedLocale } from '@joeblew999/remy-ui/client';
import { pageMeta } from '../seo';
import type { Route } from './+types/formats';

// The loader runs at build time in Node, where the Intl Locale Info methods exist.
export function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.locale);
  return { locale, info: localeInfo(locale) };
}
export function meta({ params }: Route.MetaArgs) {
  return pageMeta(params, '/formats', locale => m.formats_title({}, { locale }), locale => m.formats_description({}, { locale }));
}
export default function Formats({ loaderData: { locale, info } }: Route.ComponentProps) {
  return <FormatsPage locale={locale} info={info} preferred={useSuggestedLocale(locale)} />;
}
