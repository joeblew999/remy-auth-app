import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { LocationPage } from '@joeblew999/remy-showcase/app-pages';
import { DevicePlace } from '@joeblew999/remy-showcase/parts/deferred-place/device-place';
import { pageHead } from '../head';

// The device's own location, asked in the browser. No network location: a prerendered page has no request.
export const Route = createFileRoute('/app/location')({
  head: () => pageHead('/app/location', locale => m.location_title({}, { locale }), locale => m.location_description({}, { locale })),
  component: Location,
});

function Location() {
  const locale = getLocale();
  return <LocationPage locale={locale}><DevicePlace locale={locale} /></LocationPage>;
}
