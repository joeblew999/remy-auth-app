import { lighthouseChecks } from '@joeblew999/remy-ui/checks';

lighthouseChecks({ pages: [
  { path: '/en', device: 'mobile' },
  { path: '/en', device: 'desktop' },
  { path: '/ar', device: 'mobile' },
  { path: '/en/demo', device: 'mobile' },
  { path: '/en/formats', device: 'mobile' },
] });
