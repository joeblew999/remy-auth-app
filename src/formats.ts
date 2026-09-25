import { getLocale } from '@joeblew999/remy-ui/locale';
import { localeInfo } from '@joeblew999/remy-ui/locale-info';
import { formatsSearchSchema } from '@joeblew999/remy-ui/showcase/search-params';

/**
 * The route options both formats routes share (site /formats and app /app/formats).
 * The loader runs at build time in the prerendering Worker and again on client navigation; both
 * have the Intl Locale Info methods. No Cloudflare location: a prerendered page has no request.
 */
export const formatsRouteOptions = {
  // ?currency, ?count and ?calendar, validated with defaults (each route strips the defaults from
  // its URLs). The prerendered HTML cannot know them, so the controls show the chosen values once
  // hydrated (prerenderedChoiceCards).
  validateSearch: formatsSearchSchema,
  loader: () => ({ info: localeInfo(getLocale()) }),
};
