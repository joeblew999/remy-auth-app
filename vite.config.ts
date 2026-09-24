import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  // PUBLIC_ORIGIN is the deployed origin for canonical and alternate links, set at build time.
  envPrefix: ['VITE_', 'PUBLIC_'],
  server: { host: '127.0.0.1', port: 5174, strictPort: true },
});
