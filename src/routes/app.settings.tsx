import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { SettingsPage } from '@joeblew999/remy-showcase/app-pages';
import { pageHead } from '../head';

// The shared SettingsPage: language, appearance, the product's name and what is deployed (src/remy-app.tsx).
export const Route = createFileRoute('/app/settings')({
  head: () => pageHead('/app/settings', locale => m.settings_title({}, { locale }), locale => m.settings_description({}, { locale })),
  component: Settings,
});

function Settings() {
  return <SettingsPage locale={getLocale()} />;
}
