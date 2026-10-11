import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { HomePage } from '@joeblew999/remy-showcase/pages';
import { pageHead } from '../head';

// A site page: complete in the prerendered HTML without JavaScript.
export const Route = createFileRoute('/')({
  head: () => pageHead('', (locale, product) => m.home_title({ product }, { locale }), (locale, product) => m.home_description({ product }, { locale })),
  component: Home,
});

function Home() {
  return <HomePage locale={getLocale()} />;
}
