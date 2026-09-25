import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { DemoPage } from '@joeblew999/remy-ui/app-pages';
import { useLeaveGuard } from '@joeblew999/remy-ui/showcase/navigation-blocking';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// An app page (paths.js): prerendered like every page, noindex; the counter, the reservation form
// and the leave warning work after hydration. No server: the form confirms in the browser.
export const Route = createFileRoute('/app/demo')({
  head: () => pageHead('/app/demo', locale => m.demo_title({}, { locale }), locale => m.demo_description({}, { locale })),
  component: Demo,
});
function Demo() {
  return <DemoPage locale={getLocale()} preferred={usePreferred()} onDirtyChange={useLeaveGuard()} />;
}
