import { test, expect, type Page } from '@playwright/test';
import { locales, baseLocale } from '@joeblew999/remy-ui/runtime';
import { m } from '@joeblew999/remy-ui/messages';
import { samples } from '../app/samples';
import { publicPaths } from '../app/paths';

// Node's own Intl is the oracle for everything the package formats; the compiled messages
// come from the published package, exactly as the app receives them.
const endonym = (locale: string) => new Intl.DisplayNames([locale], { type: 'language' }).of(locale)!;
const direction = (locale: string): string => (new Intl.Locale(locale) as any).getTextInfo().direction;
const weekday = (locale: string, day: number) => new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2024, 0, day)));
const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  return errors;
};

for (const locale of locales) {
  const o = { locale };

  test(`${locale}: prerendered home page is complete without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const response = await page.goto(`${baseURL}/${locale}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('html')).toHaveAttribute('dir', direction(locale));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(m.home_title({}, o));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', m.home_description({}, o));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${baseURL}/${locale}`);
    for (const other of locales) await expect(page.locator(`link[hreflang="${other}"]`)).toHaveAttribute('href', `${baseURL}/${other}`);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', `${baseURL}/`);
    for (const other of locales) await expect(page.getByRole('link', { name: endonym(other), exact: true })).toHaveAttribute('href', `/${other}`);
    await expect(page.locator('aside.language-hint')).toHaveCount(0);
    await context.close();
  });

  test(`${locale}: prerendered formats page matches this language's Intl output`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    expect((await page.goto(`${baseURL}/${locale}/formats`))?.status()).toBe(200);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', `${baseURL}/formats`);
    const resolved = new Intl.DateTimeFormat(locale, { hour: 'numeric' }).resolvedOptions();
    const tag = new Intl.Locale(locale) as any;
    const numbering = tag.getNumberingSystems?.()[0] ?? resolved.numberingSystem;
    const expected: Record<string, string> = {
      tag: locale,
      name: endonym(locale),
      direction: direction(locale) === 'rtl' ? m.direction_rtl({}, o) : m.direction_ltr({}, o),
      languages: new Intl.ListFormat(locale, { type: 'conjunction' }).format(locales.map(endonym)),
      calendar: new Intl.DisplayNames([locale], { type: 'calendar' }).of(resolved.calendar)!,
      numbering: `${numbering} · ${new Intl.NumberFormat(locale, { numberingSystem: numbering }).format(samples.decimal)}`,
      'hour-cycle': ['h11', 'h12'].includes(resolved.hourCycle ?? '') ? m.hour_cycle_12({}, o) : m.hour_cycle_24({}, o),
      'week-start': weekday(locale, tag.getWeekInfo().firstDay),
      instant: new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'long', timeZone: 'UTC' }).format(samples.instant),
      date: new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(samples.date),
      relative: new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(samples.days, 'day'),
      decimal: new Intl.NumberFormat(locale).format(samples.decimal),
      percent: new Intl.NumberFormat(locale, { style: 'percent' }).format(samples.share),
      compact: new Intl.NumberFormat(locale, { notation: 'compact' }).format(samples.big),
      currency: new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(samples.amount),
    };
    for (const [sample, text] of Object.entries(expected)) await expect(page.locator(`[data-sample="${sample}"]`), sample).toHaveText(text);
    for (const count of samples.counts) await expect(page.locator(`[data-count="${count}"]`)).toHaveText(m.apps_count({ count }, o));
    for (const n of samples.positions) await expect(page.locator(`[data-position="${n}"]`)).toHaveText(m.position_value({ n }, o));
    await context.close();
  });

  test(`${locale}: demo counter and reservation form work after hydration`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(`/${locale}/demo`);
    await page.getByRole('button', { name: m.increment({}, o), exact: true }).click();
    await expect(page.locator('output')).toHaveText(new Intl.NumberFormat(locale).format(1));
    await page.getByRole('button', { name: m.submit({}, o), exact: true }).click();
    await expect(page.locator('#name-error')).toHaveText(m.name_required({}, o));
    await page.getByLabel(m.name_label({}, o), { exact: true }).fill('Alex');
    await page.getByLabel(m.guests_label({}, o), { exact: true }).fill('3');
    await page.getByRole('button', { name: m.submit({}, o), exact: true }).click();
    await expect(page.locator('.reserved')).toHaveText(m.reserved({ name: 'Alex', count: 3 }, o));
    await expect(page.locator('[data-sample="local"]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('entry URLs are static lists of every language, and the browser moves to the visitor\'s language', async ({ request, browser, baseURL }) => {
  for (const path of publicPaths) {
    const response = await request.get(path || '/');
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<html lang="${baseLocale}"`);
    for (const locale of locales) expect(html).toContain(`href="/${locale}${path}"`);
    expect(html).toContain(`<link rel="canonical" href="${baseURL}${path || '/'}"`);
    expect(html).toMatch(new RegExp(`hreflang="x-default" href="${baseURL}${path || '/'}"`, 'i'));
  }
  const context = await browser.newContext({ locale: 'es-ES' });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page).toHaveURL(`${baseURL}/es`);
  await page.goto(`${baseURL}/formats`);
  await expect(page).toHaveURL(`${baseURL}/es/formats`);
  await context.close();
});

test('a page in another language offers the preferred one, and dismissing is remembered', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ locale: 'es-ES' });
  const page = await context.newPage();
  await page.goto(`${baseURL}/en`);
  const hint = page.locator('aside.language-hint');
  await expect(hint).toContainText(m.language_hint({ language: endonym('es') }, { locale: 'es' }));
  await expect(hint.getByRole('link')).toHaveAttribute('href', '/es');
  await hint.getByRole('button').click();
  await expect(hint).toHaveCount(0);
  await page.goto(`${baseURL}/demo`);
  await expect(page).toHaveURL(`${baseURL}/en/demo`);
  await context.close();
});

test('unknown paths are real 404s; the sitemap lists only prerendered, self-canonical URLs', async ({ request, baseURL }) => {
  for (const path of ['/zz', '/en/missing', '/zz/demo']) expect((await request.get(path)).status(), path).toBe(404);
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  expect(urls.sort()).toEqual(locales.flatMap(locale => publicPaths.map(path => `${baseURL}/${locale}${path}`)).sort());
  for (const url of urls) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(200);
    expect(await response.text(), url).toContain(`<link rel="canonical" href="${url}"`);
  }
  for (const lang of [...locales, 'x-default']) expect(xml.match(new RegExp(`hreflang="${lang}"`, 'g'))?.length, lang).toBe(urls.length);
  expect(await (await request.get('/robots.txt')).text()).toContain(`${baseURL}/sitemap.xml`);
});

test('right-to-left languages mirror the header and every page fits a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const locale of locales) for (const path of publicPaths) {
    await page.goto(`/${locale}${path}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${locale}${path} overflows`).toBe(true);
    const brand = (await page.locator('.brand').boundingBox())!;
    const languages = (await page.locator('nav.languages').boundingBox())!;
    if (direction(locale) === 'rtl') expect(brand.x, `${locale}${path}`).toBeGreaterThan(languages.x);
    else expect(brand.x, `${locale}${path}`).toBeLessThan(languages.x);
  }
});
