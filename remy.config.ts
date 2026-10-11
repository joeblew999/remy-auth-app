import type { RemyProject } from '@joeblew999/remy-ui/project';

// Where remy-auth-app is deployed and its local port: the one place the tooling reads them (npm run dev:*).
export default {
  origins: { production: 'https://remy-auth-app.gedw99.workers.dev' },
  ports: { preview: 4174 },
} satisfies RemyProject;
