import { useEffect } from 'react';
import { baseLocale, shouldRedirect } from '@joeblew999/remy-ui/runtime';
import { LanguageLinks } from '@joeblew999/remy-ui/language';
import { alternates } from '@joeblew999/remy-ui/seo';
import { m } from '@joeblew999/remy-ui/messages';
import { origin } from './origin';

/** head() for an entry URL without a locale: canonical to itself, every language version linked, x-default to itself. */
export function entryHead(path: string) {
  const locale = baseLocale;
  return {
    meta: [{ title: `${m.language_label({}, { locale })} | Remy` }, { name: 'description', content: m.home_description({}, { locale }) }],
    links: [
      { rel: 'canonical', href: `${origin}${path || '/'}` },
      ...alternates(origin, path, locale).alternates.map(link => ({ rel: 'alternate', hrefLang: link.hrefLang, href: link.href })),
    ],
  };
}

/**
 * Prerendered as a plain list of every language version; in the browser Paraglide resolves
 * the visitor's language (remembered choice, then the browser's languages, else the base
 * locale) and the page moves there, exactly as remy-auth's server middleware does.
 */
export function Entry({ path }: { path: string }) {
  useEffect(() => {
    shouldRedirect().then(decision => { if (decision.shouldRedirect && decision.redirectUrl) location.replace(decision.redirectUrl.href); });
  }, [path]);
  return <main id="main" className="mx-auto max-w-xl px-6 py-20">
    <h1 className="mb-6 text-3xl font-semibold tracking-tight">{m.language_label({}, { locale: baseLocale })}</h1>
    <LanguageLinks locale={baseLocale} path={path} />
  </main>;
}
