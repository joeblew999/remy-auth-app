/** The public origin for canonical and alternate links; a build-time value because no request exists when prerendering. */
export const origin = (import.meta.env.PUBLIC_ORIGIN as string | undefined) ?? 'http://127.0.0.1:4174';
