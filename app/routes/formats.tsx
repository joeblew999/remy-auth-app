import { locales, localeName, direction } from '@joeblew999/remy-ui/locale';
import { DeviceTime } from '@joeblew999/remy-ui/client';
import { localeInfo, weekdayName } from '@joeblew999/remy-ui/locale-info';
import { m } from '@joeblew999/remy-ui/messages';
import { Shell } from '../shell';
import { requireLocale } from '../locale';
import { pageMeta } from '../seo';
import { samples } from '../samples';
import type { Route } from './+types/formats';

// The loader runs at build time in Node, where the Intl Locale Info methods exist.
export function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.locale);
  return { locale, info: localeInfo(locale) };
}
export function meta({ params }: Route.MetaArgs) {
  return pageMeta(params, '/formats', locale => m.formats_title({}, { locale }), locale => m.formats_description({}, { locale }));
}

export default function Formats({ loaderData: { locale, info } }: Route.ComponentProps) {
  const o = { locale };
  const dir = direction(locale);
  const list = new Intl.ListFormat(locale, { type: 'conjunction' });
  const calendarName = new Intl.DisplayNames([locale], { type: 'calendar' });
  const Row = ({ sample, label, children }: { sample: string; label: string; children: React.ReactNode }) =>
    <div><dt>{label}</dt><dd data-sample={sample}>{children}</dd></div>;
  return <Shell locale={locale} path="/formats">
    <section className="page formats">
      <a className="back-link" href={`/${locale}`}><span aria-hidden="true" className="back-arrow" />{m.home_link({}, o)}</a>
      <p className="eyebrow">{m.formats_label({}, o)}</p>
      <h1>{m.formats_title({}, o)}</h1>
      <p className="intro">{m.formats_intro({}, o)}</p>

      <h2>{m.language_label({}, o)}</h2>
      <dl>
        <Row sample="tag" label={m.language_tag({}, o)}><code>{locale}</code></Row>
        <Row sample="name" label={m.language_name({}, o)}>{localeName(locale)}</Row>
        <div><dt>{m.direction_label({}, o)}</dt><dd data-sample="direction" data-direction={dir}>{dir === 'rtl' ? m.direction_rtl({}, o) : m.direction_ltr({}, o)}</dd></div>
        <Row sample="languages" label={m.languages_available({}, o)}>{list.format(locales.map(value => localeName(value)))}</Row>
      </dl>

      <h2>{m.systems_heading({}, o)}</h2>
      <dl>
        <Row sample="calendar" label={m.calendar_label({}, o)}>{calendarName.of(info.calendar)}</Row>
        <Row sample="numbering" label={m.numbering_label({}, o)}><code>{info.numberingSystem}</code> · {new Intl.NumberFormat(locale, { numberingSystem: info.numberingSystem }).format(samples.decimal)}</Row>
        <Row sample="hour-cycle" label={m.hour_cycle_label({}, o)}>{['h11', 'h12'].includes(info.hourCycle) ? m.hour_cycle_12({}, o) : m.hour_cycle_24({}, o)}</Row>
        {info.firstDay && <Row sample="week-start" label={m.week_start_label({}, o)}>{weekdayName(locale, info.firstDay)}</Row>}
      </dl>

      <h2>{m.dates_heading({}, o)}</h2>
      <dl>
        <Row sample="instant" label={m.instant_label({}, o)}><time dateTime={samples.instant.toISOString()}>{m.instant_value({ instant: samples.instant }, o)}</time></Row>
        <Row sample="date" label={m.plain_date_label({}, o)}><time dateTime={samples.date.toISOString().slice(0, 10)}>{m.plain_date_value({ date: samples.date }, o)}</time></Row>
        <Row sample="relative" label={m.relative_label({}, o)}>{m.relative_value({ days: samples.days }, o)}</Row>
        <Row sample="local-row" label={m.local_time_label({}, o)}><DeviceTime locale={locale} instant={samples.instant} data-sample="local" /></Row>
      </dl>

      <h2>{m.numbers_heading({}, o)}</h2>
      <dl>
        <Row sample="decimal" label={m.decimal_label({}, o)}>{m.decimal_value({ value: samples.decimal }, o)}</Row>
        <Row sample="percent" label={m.percent_label({}, o)}>{m.percent_value({ value: samples.share }, o)}</Row>
        <Row sample="compact" label={m.compact_label({}, o)}>{m.compact_value({ value: samples.big }, o)}</Row>
      </dl>

      <h2>{m.currency_heading({}, o)}</h2>
      <dl>
        <Row sample="currency" label={m.currency_label({}, o)}>{m.currency_value({ amount: samples.amount }, o)}</Row>
      </dl>

      <h2>{m.plural_heading({}, o)}</h2>
      <ul className="pills">{samples.counts.map(count => <li key={count} data-count={count}>{m.apps_count({ count }, o)}</li>)}</ul>

      <h2>{m.ordinal_heading({}, o)}</h2>
      <ul className="pills">{samples.positions.map(n => <li key={n} data-position={n}>{m.position_value({ n }, o)}</li>)}</ul>
    </section>
  </Shell>;
}
