import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { ClockPage } from '@joeblew999/remy-ui/app-pages';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// The clock: the chosen zones live in the address (?zones=Asia/Tokyo,Europe/London), so a set is a link.
// A plain validateSearch, not a Zod schema: it loads with every page.
const defaults = { zones: 'Europe/London,Asia/Tokyo' };
export const Route = createFileRoute('/app/clock')({
  validateSearch: (search: Record<string, unknown>) => ({ zones: typeof search.zones === 'string' ? search.zones : defaults.zones }),
  search: { middlewares: [stripSearchParams(defaults)] },
  head: () => pageHead('/app/clock', locale => m.clock_title({}, { locale }), locale => m.clock_description({}, { locale })),
  component: Clock,
});
function Clock() {
  const navigate = Route.useNavigate();
  const zones = Route.useSearch().zones.split(',').filter(Boolean);
  return <ClockPage locale={getLocale()} preferred={usePreferred()} zones={zones}
    onZonesChange={next => navigate({ search: { zones: next.join(',') }, replace: true })} />;
}
