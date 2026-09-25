import { useEffect, useState } from 'react';
import { extractLocaleFromUrl, type Locale } from '@joeblew999/remy-ui/runtime';
import { suggestedLocaleInBrowser } from '@joeblew999/remy-ui/tanstack';

// Decided once, when this module loads in the browser: before hydration calls getLocale(), which
// writes the page's locale into Paraglide's cookie and would hide the remembered choice. The page
// locale cannot change without a full navigation (the switcher reloads), so it holds all session.
const atLoad = typeof document === 'undefined' ? undefined : (() => {
  const page = extractLocaleFromUrl(location.href);
  return page ? suggestedLocaleInBrowser(page) : undefined;
})();

/**
 * The language worth offering on this page, if any. Undefined in the prerendered HTML and during
 * hydration, so the static page never depends on the visitor; set right after hydration.
 */
export function usePreferred(): Locale | undefined {
  const [preferred, setPreferred] = useState<Locale | undefined>(undefined);
  useEffect(() => { setPreferred(atLoad); }, []);
  return preferred;
}
