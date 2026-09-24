import { renderToString } from 'react-dom/server';
import { App } from './app';
process.stdout.write(renderToString(<App />));
