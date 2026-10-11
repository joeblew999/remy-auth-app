import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { ClockPage } from '@joeblew999/remy-showcase/app-pages';
import { clockDefaults, clockRouteOptions, clockZones } from '@joeblew999/remy-showcase/clock-route';
import { pageHead } from '../head';

// The clock (the showcase's ClockPage and its route options): the chosen zones live in the address.
export const Route = createFileRoute('/app/clock')({
  ...clockRouteOptions,
  search: { middlewares: [stripSearchParams(clockDefaults)] },
  head: () => pageHead('/app/clock', locale => m.clock_title({}, { locale }), locale => m.clock_description({}, { locale })),
  component: Clock,
});

function Clock() {
  const navigate = Route.useNavigate();
  const zones = clockZones(Route.useSearch());
  return <ClockPage locale={getLocale()} zones={zones} onZonesChange={next => navigate({ search: { zones: next.join(',') }, replace: true })} />;
}
