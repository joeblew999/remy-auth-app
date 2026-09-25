import type { Locale } from '@joeblew999/remy-ui/locale';
import { pageHead as sharedPageHead } from '@joeblew999/remy-ui/tanstack';
import { origin } from './origin';

/** A localized page's head(): title, description, canonical and hreflang links on the build-time public origin. */
export function pageHead(path: string, title: (locale: Locale) => string, description: (locale: Locale) => string) {
  return sharedPageHead({ path, title, description, origin });
}
