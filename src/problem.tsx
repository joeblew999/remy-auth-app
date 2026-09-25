import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';

/** The localized not-found (missing) or error page, kept out of search results. */
export function Problem({ missing }: { missing: boolean }) {
  const locale = getLocale();
  const title = missing ? m.not_found({}, { locale }) : m.error_title({}, { locale });
  return <main className="mx-auto max-w-3xl px-6 py-20"><meta name="robots" content="noindex" />
    <title>{title}</title>
    <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
    <p className="my-6 text-muted-foreground">{missing ? m.not_found_detail({}, { locale }) : m.error_detail({}, { locale })}</p>
    <a className="underline underline-offset-4" href={`/${locale}`}>{m.home_link({}, { locale })}</a>
  </main>;
}
export const NotFound = () => <Problem missing />;
export const ErrorPage = () => <Problem missing={false} />;
