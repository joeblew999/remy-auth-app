import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { AccountPage } from '@joeblew999/remy-ui/app-pages';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// The shared AccountPage: An empty state until the auth service signs people in.
export const Route = createFileRoute('/app/account')({
  head: () => pageHead('/app/account', locale => m.account_title({}, { locale }), locale => m.account_description({}, { locale })),
  component: Account,
});
function Account() {
  return <AccountPage locale={getLocale()} preferred={usePreferred()} />;
}
