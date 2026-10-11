import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { AppHomePage } from '@joeblew999/remy-showcase/app-pages';
import { StatusCard, statusRefreshMs } from '@joeblew999/remy-showcase/parts/status-card/card';
import { pageHead } from '../head';
import { remyAuth, remyAuthOrigin } from '../remy-auth';

// The app's home inside the app shell, with remy-auth's live status: this app has no server, so
// the browser asks remy-auth's GET /api/status across origins, through its published contract
// (src/remy-auth.ts). The prerendered HTML holds no status. The contract and the oRPC client stay
// in this route's own chunk (TanStack's automatic code splitting).
export const Route = createFileRoute('/app/')({
  head: () => pageHead('/app', locale => m.app_home_title({}, { locale }), (locale, product) => m.app_home_description({ product }, { locale })),
  component: AppHome,
});

const statusQuery = { ...remyAuth.status.queryOptions({ staleTime: statusRefreshMs }), enabled: Boolean(remyAuthOrigin) };

function AppHome() {
  const locale = getLocale();
  return <AppHomePage locale={locale}>
    <StatusCard locale={locale} query={statusQuery} serverRendered={false} />
  </AppHomePage>;
}
