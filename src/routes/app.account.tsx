import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { AccountPage } from '@joeblew999/remy-showcase/app-pages';
import { pageHead } from '../head';

// The shared AccountPage: the empty state, since this app signs nobody in (remy-auth does).
export const Route = createFileRoute('/app/account')({
  head: () => pageHead('/app/account', locale => m.account_title({}, { locale }), (locale, product) => m.account_description({ product }, { locale })),
  component: Account,
});

function Account() {
  return <AccountPage locale={getLocale()} />;
}
