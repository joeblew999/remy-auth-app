import { createFileRoute } from '@tanstack/react-router';
import { getLocale } from '@joeblew999/remy-ui/locale';
import { m } from '@joeblew999/remy-ui/messages';
import { DemoPage } from '@joeblew999/remy-ui/pages';
import { useLeaveGuard } from '@joeblew999/remy-ui/showcase/navigation-blocking';
import { pageHead } from '../head';
import { usePreferred } from '../preferred';

// Prerendered like every page; the counter, the reservation form and the leave warning work after hydration.
export const Route = createFileRoute('/demo')({
  head: () => pageHead('/demo', locale => m.demo_title({}, { locale }), locale => m.demo_description({}, { locale })),
  component: Demo,
});
function Demo() {
  return <DemoPage locale={getLocale()} preferred={usePreferred()} onDirtyChange={useLeaveGuard()} />;
}
