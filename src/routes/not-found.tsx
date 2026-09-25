import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '../problem';

// notFoundPath (../paths.ts); file routes need the literal. Rendered with 200 only so prerendering
// can write each locale's 404.html (vite.config.ts); the asset host serves the nearest one with a
// 404 status for unknown paths, and no public URL links here. Static HTML: the document leaves
// out the app's scripts on this route (routes/__root.tsx).
export const Route = createFileRoute('/not-found')({ component: NotFound });
