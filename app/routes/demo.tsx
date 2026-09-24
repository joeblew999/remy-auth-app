import { m } from '@joeblew999/remy-ui/messages';
import { DemoPage } from '@joeblew999/remy-ui/pages';
import { requireLocale } from '@joeblew999/remy-ui/react-router';
import { useSuggestedLocale } from '@joeblew999/remy-ui/client';
import { pageMeta } from '../seo';
import type { Route } from './+types/demo';

export function loader({ params }: Route.LoaderArgs) { return { locale: requireLocale(params.locale) }; }
export function meta({ params }: Route.MetaArgs) {
  return pageMeta(params, '/demo', locale => m.demo_title({}, { locale }), locale => m.demo_description({}, { locale }));
}
export default function Demo({ loaderData: { locale } }: Route.ComponentProps) {
  return <DemoPage locale={locale} preferred={useSuggestedLocale(locale)} />;
}
