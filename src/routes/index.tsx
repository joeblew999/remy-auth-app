import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { HomePage } from '@joeblew999/remy-ui/pages';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

export const Route = createFileRoute('/')({
  head: () => pageHead('', locale => m.home_title({}, { locale }), locale => m.home_description({}, { locale })),
  component: Home,
});
function Home() {
  return <HomePage locale={getLocale()} preferred={usePreferred()} />;
}
