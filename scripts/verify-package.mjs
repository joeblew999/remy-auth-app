// Proves the published package works outside remy-auth in both modes: the client bundle
// Vite just built, and a server render of the same components from the SSR bundle.
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const { version } = JSON.parse(readFileSync('node_modules/@joeblew999/remy-ui/package.json', 'utf8'));
const html = execFileSync(process.execPath, ['dist/server/server.js'], { encoding: 'utf8' });
const css = readdirSync('dist/assets').filter(file => file.endsWith('.css')).map(file => readFileSync(`dist/assets/${file}`, 'utf8')).join('');
const checks = {
  'server render: Arabic title': html.includes('مكان واحد مألوف'),
  'server render: right-to-left section': html.includes('dir="rtl"'),
  'server render: Spanish currency format': html.includes('1234,50'),
  'server render: shared button markup': html.includes('data-slot="button"'),
  'client build: theme tokens in the stylesheet': css.includes('--primary'),
  'client build: button utilities in the stylesheet': css.includes('.bg-primary'),
};
let failed = false;
for (const [name, ok] of Object.entries(checks)) { console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}`); failed ||= !ok; }
if (failed) process.exit(1);
console.log(`@joeblew999/remy-ui ${version}: consumed in a client build and a server render outside remy-auth.`);
