import { ArrowLeftIcon } from 'lucide-react';
import { locales, localeName, direction } from '@joeblew999/remy-ui/locale';
import { localeInfo, weekdayName } from '@joeblew999/remy-ui/locale-info';
import { DeviceTime } from '@joeblew999/remy-ui/client';
import { Badge } from '@joeblew999/remy-ui/components/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@joeblew999/remy-ui/components/card';
import { m } from '@joeblew999/remy-ui/messages';
import { samples } from '@joeblew999/remy-ui/samples';
import { Shell } from '../shell';
import { requireLocale } from '../locale';
import { pageMeta } from '../seo';
import type { Route } from './+types/formats';

// The loader runs at build time in Node, where the Intl Locale Info methods exist.
export function loader({ params }: Route.LoaderArgs) {
  const locale = requireLocale(params.locale);
  return { locale, info: localeInfo(locale) };
}
export function meta({ params }: Route.MetaArgs) {
  return pageMeta(params, '/formats', locale => m.formats_title({}, { locale }), locale => m.formats_description({}, { locale }));
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader>
    <CardContent><dl className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-x-4 gap-y-3 text-sm">{children}</dl></CardContent></Card>;
}
function Row({ sample, label, children, ...rest }: { sample: string; label: string; children: React.ReactNode } & Record<string, unknown>) {
  return <><dt className="text-muted-foreground">{label}</dt><dd data-sample={sample} className="tabular-nums [overflow-wrap:anywhere]" {...rest}>{children}</dd></>;
}

export default function Formats({ loaderData: { locale, info } }: Route.ComponentProps) {
  const o = { locale };
  const dir = direction(locale);
  const list = new Intl.ListFormat(locale, { type: 'conjunction' });
  const calendarName = new Intl.DisplayNames([locale], { type: 'calendar' });
  return <Shell locale={locale} path="/formats">
    <section className="mx-auto flex max-w-2xl flex-col gap-6">
      <a className="inline-flex items-center gap-1 text-sm text-muted-foreground" href={`/${locale}`}><ArrowLeftIcon aria-hidden="true" className="size-4 rtl:rotate-180" />{m.home_link({}, o)}</a>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{m.formats_label({}, o)}</p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{m.formats_title({}, o)}</h1>
      <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{m.formats_intro({}, o)}</p>

      <Group title={m.language_label({}, o)}>
        <Row sample="tag" label={m.language_tag({}, o)}><code>{locale}</code></Row>
        <Row sample="name" label={m.language_name({}, o)}>{localeName(locale)}</Row>
        <Row sample="direction" label={m.direction_label({}, o)} data-direction={dir}>{dir === 'rtl' ? m.direction_rtl({}, o) : m.direction_ltr({}, o)}</Row>
        <Row sample="languages" label={m.languages_available({}, o)}>{list.format(locales.map(value => localeName(value)))}</Row>
      </Group>

      <Group title={m.systems_heading({}, o)}>
        <Row sample="calendar" label={m.calendar_label({}, o)}>{calendarName.of(info.calendar)}</Row>
        <Row sample="numbering" label={m.numbering_label({}, o)}><code>{info.numberingSystem}</code> · {new Intl.NumberFormat(locale, { numberingSystem: info.numberingSystem }).format(samples.decimal)}</Row>
        <Row sample="hour-cycle" label={m.hour_cycle_label({}, o)}>{['h11', 'h12'].includes(info.hourCycle) ? m.hour_cycle_12({}, o) : m.hour_cycle_24({}, o)}</Row>
        {info.firstDay && <Row sample="week-start" label={m.week_start_label({}, o)}>{weekdayName(locale, info.firstDay)}</Row>}
      </Group>

      <Group title={m.dates_heading({}, o)}>
        <Row sample="instant" label={m.instant_label({}, o)}><time dateTime={samples.instant.toISOString()}>{m.instant_value({ instant: samples.instant }, o)}</time></Row>
        <Row sample="date" label={m.plain_date_label({}, o)}><time dateTime={samples.date.toISOString().slice(0, 10)}>{m.plain_date_value({ date: samples.date }, o)}</time></Row>
        <Row sample="relative" label={m.relative_label({}, o)}>{m.relative_value({ days: samples.days }, o)}</Row>
        <Row sample="local-row" label={m.local_time_label({}, o)}><DeviceTime locale={locale} instant={samples.instant} data-sample="local" /></Row>
      </Group>

      <Group title={m.numbers_heading({}, o)}>
        <Row sample="decimal" label={m.decimal_label({}, o)}>{m.decimal_value({ value: samples.decimal }, o)}</Row>
        <Row sample="percent" label={m.percent_label({}, o)}>{m.percent_value({ value: samples.share }, o)}</Row>
        <Row sample="compact" label={m.compact_label({}, o)}>{m.compact_value({ value: samples.big }, o)}</Row>
      </Group>

      <Group title={m.currency_heading({}, o)}>
        <Row sample="currency" label={m.currency_label({}, o)}>{m.currency_value({ amount: samples.amount }, o)}</Row>
      </Group>

      <Card><CardHeader><CardTitle>{m.plural_heading({}, o)}</CardTitle></CardHeader>
        <CardContent><ul className="flex flex-wrap gap-2">{samples.counts.map(count => <li key={count}><Badge variant="outline" data-count={count}>{m.apps_count({ count }, o)}</Badge></li>)}</ul></CardContent></Card>
      <Card><CardHeader><CardTitle>{m.ordinal_heading({}, o)}</CardTitle></CardHeader>
        <CardContent><ul className="flex flex-wrap gap-2">{samples.positions.map(n => <li key={n}><Badge variant="outline" data-position={n}>{m.position_value({ n }, o)}</Badge></li>)}</ul></CardContent></Card>
    </section>
  </Shell>;
}
