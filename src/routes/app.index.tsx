import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { AppHomePage } from '@joeblew999/remy-ui/app-pages';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// The app's home inside the app shell. No status card: this app has no server to ask.
export const Route = createFileRoute('/app/')({
  head: () => pageHead('/app', locale => m.app_home_title({}, { locale }), locale => m.app_home_description({}, { locale })),
  component: AppHome,
});
function AppHome() {
  return <AppHomePage locale={getLocale()} preferred={usePreferred()} />;
}
