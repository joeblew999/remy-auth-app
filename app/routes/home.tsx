import { buttonVariants } from '@joeblew999/remy-ui/button';
import { m } from '@joeblew999/remy-ui/messages';
import { Shell } from '../shell';
import { requireLocale } from '../locale';
import { pageMeta } from '../seo';
import type { Route } from './+types/home';

export function loader({ params }: Route.LoaderArgs) { return { locale: requireLocale(params.locale) }; }
export function meta({ params }: Route.MetaArgs) {
  return pageMeta(params, '', locale => m.home_title({}, { locale }), locale => m.home_description({}, { locale }));
}
export default function Home({ loaderData: { locale } }: Route.ComponentProps) {
  const o = { locale };
  return <Shell locale={locale}>
    <section className="hero">
      <p className="eyebrow">{m.public_label({}, o)}</p>
      <h1>{m.home_title({}, o)}</h1>
      <p className="intro">{m.home_intro({}, o)}</p>
      <div className="actions">
        <a className={buttonVariants({ size: 'lg' })} href={`/${locale}/demo`}>{m.demo_link({}, o)}</a>
        <a className={buttonVariants({ size: 'lg', variant: 'outline' })} href={`/${locale}/formats`}>{m.formats_link({}, o)}</a>
      </div>
    </section>
  </Shell>;
}
