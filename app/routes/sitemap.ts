import { locales } from '@joeblew999/remy-ui/locale';
import { alternates } from '@joeblew999/remy-ui/seo';
import { origin } from '../origin';
import { publicPaths } from '@joeblew999/remy-ui/paths';
export function loader() {
  const entries = locales.flatMap(locale => publicPaths.map(path => {
    const links = alternates(origin, path, locale);
    const xhtml = links.alternates.map(link => `<xhtml:link rel="alternate" hreflang="${link.hrefLang}" href="${link.href}"/>`).join('');
    return `<url><loc>${links.canonical}</loc>${xhtml}</url>`;
  }));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
