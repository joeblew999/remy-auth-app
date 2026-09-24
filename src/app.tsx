// Everything rendered here comes from the published package; nothing from the remy-auth checkout.
import { Button } from '@joeblew999/remy-ui/button';
import { locales, direction, localeName } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';

export function App() {
  return <main>
    {locales.map(locale => <section key={locale} lang={locale} dir={direction(locale)}>
      <h1>{m.home_title({}, { locale })}</h1>
      <p>{localeName(locale)} · {m.apps_count({ count: 3 }, { locale })} · {m.currency_value({ amount: 1234.5 }, { locale })}</p>
      <Button>{m.increment({}, { locale })}</Button>
    </section>)}
  </main>;
}
