import type { Locale } from '@joeblew999/remy-ui/locale';
import { pageMeta as sharedPageMeta } from '@joeblew999/remy-ui/react-router';
import { origin } from './origin';

/** Metadata for a prerendered localized route, with the build-time public origin. */
export function pageMeta(params: { locale?: string }, path: string, title: (locale: Locale) => string, description: (locale: Locale) => string) {
  return sharedPageMeta(params, origin, path, title, description);
}
