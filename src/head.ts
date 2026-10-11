import type { Locale } from '@joeblew999/remy-ui/locale';
import { pageHead as sharedPageHead } from '@joeblew999/remy-ui/tanstack';
import { origin } from './origin';

/**
 * A localized page's head(): title, description, canonical and hreflang links on the build-time public
 * origin (no request exists when prerendering); app pages (paths.js) also get noindex from the shared
 * pageHead, and the title ends with the app's name (src/remy-app.tsx). `product` is that name, for a
 * message that says it.
 */
export function pageHead(path: string, title: (locale: Locale, product: string) => string, description: (locale: Locale, product: string) => string) {
  return sharedPageHead({ path, title, description, origin });
}
