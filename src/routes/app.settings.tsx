import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { SettingsPage } from '@joeblew999/remy-ui/app-pages';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// The shared SettingsPage: Language, appearance, and what the device tells the app.
export const Route = createFileRoute('/app/settings')({
  head: () => pageHead('/app/settings', locale => m.settings_title({}, { locale }), locale => m.settings_description({}, { locale })),
  component: Settings,
});
function Settings() {
  return <SettingsPage locale={getLocale()} preferred={usePreferred()} />;
}
