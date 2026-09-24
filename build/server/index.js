import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import "@inlang/paraglide-js/urlpattern-polyfill";
import { m } from "@joeblew999/remy-ui/messages";
import { useEffect, useState } from "react";
import { baseLocale, shouldRedirect } from "@joeblew999/remy-ui/runtime";
import { Button } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "cn";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.web.tsx
var entry_server_web_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, routerContext, _loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	let shellRendered = false;
	let userAgent = request.headers.get("user-agent");
	const body = await renderToReadableStream(/* @__PURE__ */ jsx(ServerRouter, {
		context: routerContext,
		url: request.url
	}), {
		signal: AbortSignal.timeout(6e3),
		onError(error) {
			responseStatusCode = 500;
			if (shellRendered) console.error(error);
		}
	});
	shellRendered = true;
	if (userAgent && isbot(userAgent) || routerContext.isSpaMode) await body.allReady;
	responseHeaders.set("Content-Type", "text/html");
	return new Response(body, {
		headers: responseHeaders,
		status: responseStatusCode
	});
}
/**
* The project's locales that have been specified in the settings.
*
* @example
*   if (locales.includes(userSelectedLocale) === false) {
*     throw new Error('Locale is not available');
*   }
*/
var locales = [
	"en",
	"es",
	"ar"
];
/** @type {string} */
var cookieName = "PARAGLIDE_LOCALE";
/** @type {number} */
var cookieMaxAge = 3456e4;
/**
* @type {Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>}
*/
var strategy = [
	"url",
	"cookie",
	"preferredLanguage",
	"baseLocale"
];
/**
* Route-level strategy overrides.
*
* `match` uses URLPattern syntax.
*
* @type {Array<{
*   match: string;
*   strategy?: Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>;
*   exclude?: boolean;
* }>}
*/
var routeStrategies = [];
/**
* The used URL patterns.
*
* @type {Array<{ pattern: string, localized: Array<[Locale, string]> }>}
*/
var urlPatterns = [{
	"pattern": ":protocol://:domain(.*)::port?/:path(.*)?",
	"localized": [
		["en", ":protocol://:domain(.*)::port?/en/:path(.*)?"],
		["es", ":protocol://:domain(.*)::port?/es/:path(.*)?"],
		["ar", ":protocol://:domain(.*)::port?/ar/:path(.*)?"]
	]
}];
/**
* @typedef {{
* 		getStore(): {
*   		locale?: Locale,
* 			origin?: string,
* 			messageCalls?: Set<string>
*   	} | undefined,
* 		run: (store: { locale?: Locale, origin?: string, messageCalls?: Set<string>},
*    cb: any) => any
* }} ParaglideAsyncLocalStorage
*/
/**
* Server side async local storage that is set by `serverMiddleware()`.
*
* The variable is used to retrieve the locale and origin in a server-side
* rendering context without effecting other requests.
*
* @type {ParaglideAsyncLocalStorage | undefined}
*/
var serverAsyncLocalStorage = void 0;
/**
* Returns the current server-side async local storage instance.
*
* Accessing the mutable value through a function keeps it observable when
* module interceptors wrap exported bindings and snapshot their initial value.
*
* @returns {ParaglideAsyncLocalStorage | undefined}
*/
function getServerAsyncLocalStorage() {
	return serverAsyncLocalStorage;
}
var isServer = typeof window === "undefined";
/**
* Sets the server side async local storage.
*
* The function is needed because the `runtime.js` file
* must define the `serverAsyncLocalStorage` variable to
* avoid a circular import between `runtime.js` and
* `server.js` files.
*
* @param {ParaglideAsyncLocalStorage | undefined} value
*/
function overwriteServerAsyncLocalStorage(value) {
	serverAsyncLocalStorage = value;
}
/** @type {any} */ globalThis.__paraglide = globalThis.__paraglide ?? {};
/** @type {any} */ globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {};
/**
* This is a fallback to get started with a custom
* strategy and avoid type errors.
*
* The implementation is overwritten
* by `overwriteGetLocale()` and `defineSetLocale()`.
*
* @type {Locale | undefined}
*/
var _locale;
var localeInitiallySet = false;
/**
* Get the current locale.
*
* The locale is resolved using your configured strategies (URL, cookie, localStorage, etc.)
* in the order they are defined. In SSR contexts, the locale is retrieved from AsyncLocalStorage
* which is set by the `paraglideMiddleware()`.
*
* @see https://paraglidejs.com/strategy - Configure locale detection strategies
*
* @example
*   if (getLocale() === 'de') {
*     console.log('Germany 🇩🇪');
*   } else if (getLocale() === 'nl') {
*     console.log('Netherlands 🇳🇱');
*   }
*
* @returns {Locale} The current locale.
*/
var getLocale = () => {
	if (serverAsyncLocalStorage) {
		const locale = serverAsyncLocalStorage?.getStore()?.locale;
		if (locale) return locale;
	}
	let strategyToUse = strategy;
	if (!isServer && typeof window !== "undefined" && window.location?.href) strategyToUse = getStrategyForUrl(window.location.href);
	const resolved = resolveLocaleWithStrategies(strategyToUse, typeof window !== "undefined" ? window.location?.href : void 0);
	if (resolved) {
		if (!localeInitiallySet) {
			_locale = resolved;
			localeInitiallySet = true;
			setLocale(resolved, { reload: false });
		}
		return resolved;
	}
	throw new Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
};
/**
* Resolve locale for a given URL using route-aware strategies.
*
* @param {string | URL} url
* @returns {Locale}
*/
function getLocaleForUrl(url) {
	const resolved = resolveLocaleWithStrategies(getStrategyForUrl(url), typeof url === "string" ? url : url.href);
	if (resolved) return resolved;
	throw new Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
}
/**
* @param {typeof strategy} strategyToUse
* @param {string | undefined} urlForUrlStrategy
* @returns {Locale | undefined}
*/
function resolveLocaleWithStrategies(strategyToUse, urlForUrlStrategy) {
	/** @type {string | undefined} */
	let locale;
	for (const strat of strategyToUse) {
		if (strat === "cookie") locale = extractLocaleFromCookie();
		else if (strat === "baseLocale") locale = "en";
		else if (strat === "url" && !isServer && typeof urlForUrlStrategy === "string") locale = extractLocaleFromUrl(urlForUrlStrategy);
		else if (strat === "preferredLanguage" && !isServer) locale = extractLocaleFromNavigator();
		else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
			const handler = customClientStrategies.get(strat);
			if (handler) {
				const result = handler.getLocale();
				if (result instanceof Promise) continue;
				if (result !== void 0) return assertIsLocale(result);
			}
		}
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
}
var rtlLanguages = /* @__PURE__ */ new Set([
	"ar",
	"dv",
	"fa",
	"he",
	"ks",
	"ku",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
/**
* Get writing direction for a locale.
*
* Uses `Intl.Locale` text info when available and falls back to a
* language-based RTL check for runtimes without `getTextInfo()`.
*
* @example
*   getTextDirection(); // "ltr" or "rtl" for current locale
*   getTextDirection("ar"); // "rtl"
*   getTextDirection("en"); // "ltr"
*
* @param {string} [locale] - Target locale. If not provided, uses `getLocale()`
* @returns {"ltr" | "rtl"}
*/
function getTextDirection(locale = getLocale()) {
	try {
		const intlLocale = new Intl.Locale(locale);
		const direction = intlLocale.getTextInfo?.().direction ?? intlLocale.textInfo?.direction;
		if (direction === "ltr" || direction === "rtl") return direction;
	} catch {}
	const language = locale.split("-")[0]?.toLowerCase();
	return rtlLanguages.has(language ?? "") ? "rtl" : "ltr";
}
/**
* Navigates to the localized URL, or reloads the current page
*
* @param {string} [newLocation] The new location
*/
var navigateOrReload = (newLocation) => {
	if (newLocation) window.location.href = newLocation;
	else window.location.reload();
};
/**
* @typedef {(newLocale: Locale, options?: { reload?: boolean }) => void | Promise<void>} SetLocaleFn
*/
/**
* Set the locale.
*
* Updates the locale using your configured strategies (cookie, localStorage, URL, etc.).
* By default, this navigates the client to the localized URL or reloads the current
* document to reflect the new locale. `reload: false` is a narrow browser-only escape
* hatch for a fully client-rendered, non-URL-routed surface that owns its reactive
* updates and document state. It does not re-render the UI or update the document.
* Do not use it for normal locale pickers, URL-routed pages, or switching an SSR,
* SSG, or hydrated document. It is incompatible with per-locale builds.
*
* If any custom strategy's `setLocale` function is async, then this function
* will become async as well.
*
* @see https://paraglidejs.com/strategy
*
* @example
*   setLocale('en');
*
* @example
*   setLocale('en', { reload: false });
*
* @type {SetLocaleFn}
*/
var setLocale = (newLocale, options) => {
	const optionsWithDefaults = {
		reload: true,
		...options
	};
	/** @type {Locale | undefined} */
	let currentLocale;
	try {
		currentLocale = getLocale();
	} catch {}
	/** @type {Array<Promise<void>>} */
	const customSetLocalePromises = [];
	/** @type {string | undefined} */
	let newLocation = void 0;
	let strategyToUse = strategy;
	if (!isServer && typeof window !== "undefined" && window.location?.href) strategyToUse = getStrategyForUrl(window.location.href);
	for (const strat of strategyToUse) if (strat === "cookie") {
		if (isServer || typeof document === "undefined" || typeof window === "undefined") continue;
		const cookieString = `${cookieName}=${newLocale}; path=/; max-age=${cookieMaxAge}`;
		document.cookie = cookieString;
		clearLocaleCookieCache();
	} else if (strat === "baseLocale") continue;
	else if (strat === "url" && typeof window !== "undefined") newLocation = localizeUrl(window.location.href, { locale: newLocale }).href;
	else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
		const handler = customClientStrategies.get(strat);
		if (handler) {
			let result = handler.setLocale(newLocale);
			if (result instanceof Promise) {
				result = result.catch((error) => {
					throw new Error(`Custom strategy "${strat}" setLocale failed.`, { cause: error });
				});
				customSetLocalePromises.push(result);
			}
		}
	}
	const runReload = () => {
		if (!isServer && optionsWithDefaults.reload && window.location && newLocale !== currentLocale) navigateOrReload(newLocation);
	};
	if (customSetLocalePromises.length) return Promise.all(customSetLocalePromises).then(() => {
		runReload();
	});
	runReload();
};
/**
* The origin of the current URL.
*
* Defaults to "http://example.com" in non-browser environments. If this
* behavior is not desired, the implementation can be overwritten
* by `overwriteGetUrlOrigin()`.
*
* @type {() => string}
*/
var getUrlOrigin = () => {
	if (serverAsyncLocalStorage) return serverAsyncLocalStorage.getStore()?.origin ?? "http://fallback.com";
	else if (typeof window !== "undefined") return window.location.origin;
	return "http://fallback.com";
};
/**
* Coerces a locale-like string to the canonical locale value used by the runtime.
*
* @param {unknown} value
* @returns {Locale | undefined}
*/
function toLocale(value) {
	if (typeof value !== "string") return;
	const lowerValue = value.toLowerCase();
	for (const locale of locales) if (locale.toLowerCase() === lowerValue) return locale;
}
/**
* Check if something is an available locale with the canonical project casing.
*
* @example
*   if (isLocale(params.locale)) {
*     setLocale(params.locale);
*   } else {
*     setLocale('en');
*   }
*
* Use `toLocale()` when you want case-insensitive matching and canonicalization.
*
* @param {unknown} locale
* @returns {locale is Locale}
*/
function isLocale(locale) {
	return !!locale && locales.some((item) => item === locale);
}
/**
* Asserts that the input can be normalized to a locale.
*
* @param {unknown} input - The input to check.
* @returns {Locale} The input normalized to a Locale.
* @throws {Error} If the input is not a locale.
*/
function assertIsLocale(input) {
	const locale = toLocale(input);
	if (locale) return locale;
	throw new Error(`Invalid locale: ${input}. Expected one of: ${locales.join(", ")}`);
}
/**
* Applies the configured trailing slash policy to a URL.
*
* The root pathname always remains `/`. Query parameters and hashes are not
* modified.
*
* @param {URL} url
* @returns {URL}
*/
function normalizeTrailingSlash(url) {
	if (url.pathname === "/") return url;
	url.pathname = url.pathname.replace(/\/+$/, "") || "/";
	return url;
}
/**
* Matches a canonical URL while allowing configured patterns to retain their
* existing trailing slash style.
*
* @param {URLPattern} pattern
* @param {URL} url
* @returns {any}
*/
function execUrlPattern(pattern, url) {
	if (url.pathname === "/") return pattern.exec(url.href);
	const alias = new URL(url);
	{
		const match = pattern.exec(url.href);
		if (match) return match;
		alias.pathname = alias.pathname.replace(/\/+$/, "") + "/";
		return pattern.exec(alias.href);
	}
}
/**
* Extracts a locale from a request using the provided strategy order.
*
* @param {Request} request
* @param {typeof strategy} strategies
* @param {string | URL} [url]
* @returns {Locale}
*/
var extractLocaleFromRequestWithStrategies = (request, strategies, url = request.url) => {
	const effectiveRequestUrl = resolveEffectiveRequestUrl(request, url);
	/** @type {string|undefined} */
	let locale;
	for (const strat of strategies) {
		if (strat === "cookie") {
			const cookiePrefix = cookieName + "=";
			locale = request.headers.get("cookie")?.split(";").map((c) => c.trim()).find((c) => c.startsWith(cookiePrefix))?.slice(17);
		} else if (strat === "url") locale = extractLocaleFromUrl(effectiveRequestUrl);
		else if (strat === "preferredLanguage") locale = extractLocaleFromHeader(request);
		else if (strat === "globalVariable") locale = _locale;
		else if (strat === "baseLocale") return "en";
		else if (strat === "localStorage") continue;
		else if (isCustomStrategy(strat)) continue;
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
	throw new Error("No locale found. There is an error in your strategy. Try adding 'baseLocale' as the very last strategy. Read more here https://paraglidejs.com/errors#no-locale-found");
};
/**
* @param {Request} request
* @param {string | URL | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveEffectiveRequestUrl(request, effectiveRequestUrl = request.url) {
	if (effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl.href);
	return new URL(effectiveRequestUrl, request.url);
}
/**
* Asynchronously extracts a locale from a request.
*
* This function supports async custom server strategies, unlike the synchronous
* `extractLocaleFromRequest`. Use this function when you have custom server strategies
* that need to perform asynchronous operations (like database calls) in their getLocale method.
*
* The function first processes any custom server strategies asynchronously, then falls back
* to the synchronous `extractLocaleFromRequest` for all other strategies.
*
* @see {@link https://github.com/opral/inlang-paraglide-js/issues/527#issuecomment-2978151022}
*
* @example
*   // Basic usage
*   const locale = await extractLocaleFromRequestAsync(request);
*
* @example
*   // With custom async server strategy
*   defineCustomServerStrategy("custom-database", {
*     getLocale: async (request) => {
*       const userId = extractUserIdFromRequest(request);
*       return await getUserLocaleFromDatabase(userId);
*     }
*   });
*
*   const locale = await extractLocaleFromRequestAsync(request);
*
* @param {Request} request - The request object to extract the locale from.
* @param {{ effectiveRequestUrl?: string | URL }} [options] - Effective request URL to use for route matching and locale detection with the URL strategy.
* @returns {Promise<Locale>} The extracted locale.
*/
var extractLocaleFromRequestAsync = async (request, options = {}) => {
	/** @type {string|undefined} */
	let locale;
	const effectiveRequestUrl = resolveEffectiveRequestUrlFromRequestAsync(request, options.effectiveRequestUrl);
	const strategy = getStrategyForUrl(effectiveRequestUrl);
	for (const strat of strategy) if (isCustomStrategy(strat) && customServerStrategies.has(strat)) {
		const handler = customServerStrategies.get(strat);
		if (handler)
 /** @type {string|undefined} */
		locale = await handler.getLocale(request);
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
	return extractLocaleFromRequestWithStrategies(request, strategy, effectiveRequestUrl);
};
/**
* @param {Request} request
* @param {string | URL | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveEffectiveRequestUrlFromRequestAsync(request, effectiveRequestUrl = request.url) {
	if (effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl.href);
	return new URL(effectiveRequestUrl, request.url);
}
var cookieNamePattern = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var localeCookiePattern = new RegExp(`(?:^|;\\s*)${cookieNamePattern}=([^;]*)`);
var noCachedLocale = Symbol();
/** @type {Locale | undefined | typeof noCachedLocale} */
var cachedLocaleFromCookie = noCachedLocale;
/**
* Clears the cached locale from `document.cookie`.
*/
function clearLocaleCookieCache() {
	cachedLocaleFromCookie = noCachedLocale;
}
function scheduleLocaleCookieCacheClear() {
	if (typeof queueMicrotask === "function") queueMicrotask(clearLocaleCookieCache);
	else Promise.resolve().then(clearLocaleCookieCache);
}
/**
* Extracts a cookie from the document.
*
* Will return undefined if the document is not available or if the cookie is not set.
* The `document` object is not available in server-side rendering, so this function should not be called in that context.
*
* @returns {Locale | undefined}
*/
function extractLocaleFromCookie() {
	if (typeof document === "undefined") return;
	if (cachedLocaleFromCookie !== noCachedLocale) return cachedLocaleFromCookie;
	const locale = document.cookie.match(localeCookiePattern)?.[1];
	cachedLocaleFromCookie = toLocale(locale);
	scheduleLocaleCookieCacheClear();
	return cachedLocaleFromCookie;
}
/**
* Extracts a locale from the accept-language header.
*
* Use the function on the server to extract the locale
* from the accept-language header that is sent by the client.
*
* @example
*   const locale = extractLocaleFromHeader(request);
*
* @param {Request} request - The request object to extract the locale from.
* @returns {Locale | undefined} The negotiated preferred language.
*/
function extractLocaleFromHeader(request) {
	const acceptLanguageHeader = request.headers.get("accept-language");
	if (acceptLanguageHeader) {
		const languages = acceptLanguageHeader.split(",").map((lang) => {
			const [tag, q = "1"] = lang.trim().split(";q=");
			return {
				fullTag: tag,
				baseTag: tag?.split("-")[0],
				q: Number(q)
			};
		}).sort((a, b) => b.q - a.q);
		for (const lang of languages) {
			const fullLocale = toLocale(lang.fullTag);
			if (fullLocale) return fullLocale;
			const baseLocale = toLocale(lang.baseTag);
			if (baseLocale) return baseLocale;
		}
		return;
	}
}
/**
* Negotiates a preferred language from navigator.languages.
*
* Use the function on the client to extract the locale
* from the navigator.languages array.
*
* @example
*   const locale = extractLocaleFromNavigator();
*
* @returns {Locale | undefined}
*/
function extractLocaleFromNavigator() {
	if (!navigator?.languages?.length) return;
	const languages = navigator.languages.map((lang) => ({
		fullTag: lang,
		baseTag: lang.split("-")[0]
	}));
	for (const lang of languages) {
		const fullLocale = toLocale(lang.fullTag);
		if (fullLocale) return fullLocale;
		const baseLocale = toLocale(lang.baseTag);
		if (baseLocale) return baseLocale;
	}
}
/**
* If extractLocaleFromUrl is called many times on the same page and the URL
* hasn't changed, we don't need to recompute it every time which can get expensive.
* We might use a LRU cache if needed, but for now storing only the last result is enough.
* https://github.com/opral/monorepo/pull/3575#discussion_r2066731243
*/
/** @type {string|undefined} */
var cachedUrl;
/** @type {Locale|undefined} */
var cachedLocale;
/**
* Extracts the locale from a given URL using native URLPattern.
*
* The built-in default `/:locale/...` routing is case-insensitive because it
* canonicalizes the first path segment with `toLocale()`. Custom `urlPatterns`
* keep URLPattern's normal exact matching semantics for path segments.
*
* @param {URL|string} url - The full URL from which to extract the locale.
* @returns {Locale|undefined} The extracted locale, or undefined if no locale is found.
*/
function extractLocaleFromUrl(url) {
	const urlString = typeof url === "string" ? url : url.href;
	if (cachedUrl === urlString) return cachedLocale;
	/** @type {Locale | undefined} */
	let result;
	{
		const urlObj = normalizeTrailingSlash(typeof url === "string" ? new URL(url) : new URL(url));
		for (const element of urlPatterns) {
			for (const [locale, localizedPattern] of element.localized) if (execUrlPattern(new URLPattern(localizedPattern, urlObj.href), urlObj)) {
				result = locale;
				break;
			}
			if (result) break;
		}
	}
	cachedUrl = urlString;
	cachedLocale = result;
	return result;
}
/**
* Lower-level URL localization function, primarily used in server contexts.
*
* This function is designed for server-side usage where you need precise control
* over URL localization, such as in middleware or request handlers. It works with
* URL objects and always returns absolute URLs.
*
* For client-side UI components, use `localizeHref()` instead, which provides
* a more convenient API with relative paths and automatic locale detection.
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // Server middleware example
* app.use((req, res, next) => {
*   const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
*   const localized = localizeUrl(url, { locale: "de" });
*
*   if (localized.href !== url.href) {
*     return res.redirect(localized.href);
*   }
*   next();
* });
* ```
*
* @example
* ```typescript
* // Using with URL patterns
* const url = new URL("https://example.com/about");
* localizeUrl(url, { locale: "de" });
* // => URL("https://example.com/de/about")
*
* // Using with domain-based localization
* const url = new URL("https://example.com/store");
* localizeUrl(url, { locale: "de" });
* // => URL("https://de.example.com/store")
* ```
*
* @param {string | URL} url - The URL to localize. If string, must be absolute.
* @param {object} [options] - Options for localization
* @param {Locale} [options.locale] - Target locale. If not provided, uses getLocale()
* @returns {URL} The localized URL, always absolute
*/
function localizeUrl(url, options) {
	const targetLocale = options?.locale ? assertIsLocale(options?.locale) : getLocale();
	const originalUrl = typeof url === "string" ? new URL(url) : url;
	const urlObj = normalizeTrailingSlash(new URL(originalUrl));
	for (const element of urlPatterns) {
		const fastPathLocalized = localizeUrlFastPath(urlObj, targetLocale, element);
		if (fastPathLocalized !== void 0) return fastPathLocalized;
		for (const [, localizedPattern] of element.localized) {
			const match = execUrlPattern(getUrlPattern(localizedPattern, urlObj), urlObj);
			if (!match) continue;
			const targetPattern = element.localized.find(([locale]) => locale === targetLocale)?.[1];
			if (!targetPattern) continue;
			return normalizeTrailingSlash(fillMissingUrlParts(fillPattern(targetPattern, aggregateGroups(match), urlObj.origin), match));
		}
		const unlocalizedMatch = execUrlPattern(getUrlPattern(element.pattern, urlObj), urlObj);
		if (unlocalizedMatch) {
			const targetPattern = element.localized.find(([locale]) => locale === targetLocale)?.[1];
			if (targetPattern) return normalizeTrailingSlash(fillMissingUrlParts(fillPattern(targetPattern, aggregateGroups(unlocalizedMatch), urlObj.origin), unlocalizedMatch));
		}
	}
	return originalUrl;
}
/**
* Low-level URL de-localization function, primarily used in server contexts.
*
* This function is designed for server-side usage where you need precise control
* over URL de-localization, such as in middleware or request handlers. It works with
* URL objects and always returns absolute URLs.
*
* For client-side UI components, use `deLocalizeHref()` instead, which provides
* a more convenient API with relative paths.
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // Server middleware example
* app.use((req, res, next) => {
*   const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
*   const baseUrl = deLocalizeUrl(url);
*
*   // Store the base URL for later use
*   req.baseUrl = baseUrl;
*   next();
* });
* ```
*
* @example
* ```typescript
* // Using with URL patterns
* const url = new URL("https://example.com/de/about");
* deLocalizeUrl(url); // => URL("https://example.com/about")
*
* // Using with domain-based localization
* const url = new URL("https://de.example.com/store");
* deLocalizeUrl(url); // => URL("https://example.com/store")
* ```
*
* @param {string | URL} url - The URL to de-localize. If string, must be absolute.
* @returns {URL} The de-localized URL, always absolute
*/
function deLocalizeUrl(url) {
	const originalUrl = typeof url === "string" ? new URL(url) : url;
	const urlObj = normalizeTrailingSlash(new URL(originalUrl));
	for (const element of urlPatterns) {
		const fastPathDeLocalized = deLocalizeUrlFastPath(urlObj, element);
		if (fastPathDeLocalized !== void 0) return fastPathDeLocalized;
		for (const [, localizedPattern] of element.localized) {
			const match = execUrlPattern(getUrlPattern(localizedPattern, urlObj), urlObj);
			if (match) {
				const groups = aggregateGroups(match);
				return normalizeTrailingSlash(fillMissingUrlParts(fillPattern(element.pattern, groups, urlObj.origin), match));
			}
		}
		const unlocalizedMatch = execUrlPattern(getUrlPattern(element.pattern, urlObj), urlObj);
		if (unlocalizedMatch) return normalizeTrailingSlash(fillMissingUrlParts(fillPattern(element.pattern, aggregateGroups(unlocalizedMatch), urlObj.origin), unlocalizedMatch));
	}
	return originalUrl;
}
/**
* Takes matches of implicit wildcards in the UrlPattern (when a part is missing
* it is equal to '*') and adds them back to the result of fillPattern.
*
* At least protocol and hostname are required to create a valid URL inside fillPattern.
*
* @param {URL} url
* @param {any} match
* @returns {URL}
*/
function fillMissingUrlParts(url, match) {
	if (match.protocol.groups["0"]) url.protocol = match.protocol.groups["0"] ?? "";
	if (match.hostname.groups["0"]) url.hostname = match.hostname.groups["0"] ?? "";
	if (match.username.groups["0"]) url.username = match.username.groups["0"] ?? "";
	if (match.password.groups["0"]) url.password = match.password.groups["0"] ?? "";
	if (match.port.groups["0"]) url.port = match.port.groups["0"] ?? "";
	if (match.pathname.groups["0"]) url.pathname = match.pathname.groups["0"] ?? "";
	if (match.search.groups["0"]) url.search = match.search.groups["0"] ?? "";
	if (match.hash.groups["0"]) url.hash = match.hash.groups["0"] ?? "";
	return url;
}
/**
* Fills a URL pattern with values for named groups, supporting all URLPattern-style modifiers.
*
* This function will eventually be replaced by https://github.com/whatwg/urlpattern/issues/73
*
* Matches:
* - :name        -> Simple
* - :name?       -> Optional
* - :name+       -> One or more
* - :name*       -> Zero or more
* - :name(...)   -> Regex group
* - {text}       -> Group delimiter
* - {text}?      -> Optional group delimiter
*
* If the value is `null`, the segment is removed.
*
* @param {string} pattern - The URL pattern containing named groups.
* @param {Record<string, string | null | undefined>} values - Object of values for named groups.
* @param {string} origin - Base URL to use for URL construction.
* @returns {URL} - The constructed URL with named groups filled.
*/
function fillPattern(pattern, values, origin) {
	let filled = pattern.replace(/(https?:\/\/[^:/]+):(\d+)(\/|$)/g, (_, protocol, port, slash) => {
		return `${protocol}#PORT-${port}#${slash}`;
	}).replace(/\{([^{}]*)\}([?+*]?)/g, (_, content, modifier) => {
		if (modifier === "?") return content;
		return content;
	}).replace(/(\/?):([a-zA-Z0-9_]+)(\([^)]*\))?([?+*]?)/g, (_, slash, name, __, modifier) => {
		const value = values[name];
		if (value === null) return "";
		if (modifier === "?") return value !== void 0 ? `${slash}${value}` : "";
		if (modifier === "+" || modifier === "*") {
			if (value === void 0 && modifier === "+") throw new Error(`Missing value for "${name}" (one or more required)`);
			return value ? `${slash}${value}` : "";
		}
		if (value === void 0) throw new Error(`Missing value for "${name}"`);
		return `${slash}${value}`;
	});
	filled = filled.replace(/#PORT-(\d+)#/g, ":$1");
	return new URL(filled, origin);
}
/**
* Aggregates named groups from various parts of the URLPattern match result.
*
*
* @param {any} match - The URLPattern match result object.
* @returns {Record<string, string | null | undefined>} An object containing all named groups from the match.
*/
function aggregateGroups(match) {
	return {
		...match.hash.groups,
		...match.hostname.groups,
		...match.password.groups,
		...match.pathname.groups,
		...match.port.groups,
		...match.protocol.groups,
		...match.search.groups,
		...match.username.groups
	};
}
/** @type {Map<string, URLPattern>} */
var urlPatternCache = /* @__PURE__ */ new Map();
var URL_PATTERN_CACHE_LIMIT = 128;
var ABSOLUTE_URL_PATTERN = /^(?:[A-Za-z][A-Za-z\d+.-]*|:[A-Za-z][A-Za-z\d_-]*):\/\//;
/**
* URLPattern's base URL affects relative patterns. Absolute patterns only
* depend on the pattern itself, while root-relative patterns also depend on
* the URL origin. Other relative patterns are deliberately not cached because
* their semantics depend on the complete base URL.
*
* @param {string} pattern
* @param {URL} url
* @returns {URLPattern}
*/
function getUrlPattern(pattern, url) {
	const isAbsolutePattern = ABSOLUTE_URL_PATTERN.test(pattern);
	const isRootRelativePattern = pattern.startsWith("/");
	if (!isAbsolutePattern && !isRootRelativePattern) return new URLPattern(pattern, url.href);
	const key = isAbsolutePattern ? pattern : JSON.stringify([url.origin, pattern]);
	const cached = urlPatternCache.get(key);
	if (cached !== void 0) {
		urlPatternCache.delete(key);
		urlPatternCache.set(key, cached);
		return cached;
	}
	const compiled = new URLPattern(pattern, url.href);
	if (urlPatternCache.size >= URL_PATTERN_CACHE_LIMIT) {
		const oldestKey = urlPatternCache.keys().next().value;
		if (oldestKey !== void 0) urlPatternCache.delete(oldestKey);
	}
	urlPatternCache.set(key, compiled);
	return compiled;
}
/**
* A small, deliberately conservative subset of URLPattern routing.
*
* The compiler emits routes such as `/:path(.*)?`, `/de/:path*`, or
* `https://example.com/:path*`. For those routes matching is equivalent to a
* pathname prefix check and (optionally) an origin check. Everything that has
* a dynamic host, a custom path regexp, or another URLPattern modifier keeps
* using the generic implementation above.
*
* @typedef {{
*   protocol: string | undefined;
*   hostname: string | undefined;
*   port: string | undefined;
*   pathnamePrefix: string;
*   pathMode: "segments" | "catch-all-optional" | "catch-all-required";
* }} FastPathPattern
* @typedef {{
*   base: FastPathPattern;
*   localized: Array<{ locale: string; pattern: FastPathPattern }>;
* }} FastPathRoute
*/
/** @type {WeakMap<object, FastPathRoute | null>} */
var fastPathRouteCache = /* @__PURE__ */ new WeakMap();
/**
* @param {URL} urlObj
* @param {string} targetLocale
* @param {{ pattern: string; localized: Array<[string, string]> }} element
* @returns {URL | undefined}
*/
function localizeUrlFastPath(urlObj, targetLocale, element) {
	const route = getFastPathRoute(element);
	if (route === null) return void 0;
	for (const localized of route.localized) {
		const suffix = matchFastPathPattern(localized.pattern, urlObj);
		if (suffix === void 0) continue;
		const target = route.localized.find((candidate) => candidate.locale === targetLocale)?.pattern;
		if (target === void 0) continue;
		return applyFastPathPattern(target, suffix, urlObj);
	}
	const suffix = matchFastPathPattern(route.base, urlObj);
	if (suffix !== void 0) {
		const target = route.localized.find((candidate) => candidate.locale === targetLocale)?.pattern;
		if (target !== void 0) return applyFastPathPattern(target, suffix, urlObj);
	}
}
/**
* @param {URL} urlObj
* @param {{ pattern: string; localized: Array<[string, string]> }} element
* @returns {URL | undefined}
*/
function deLocalizeUrlFastPath(urlObj, element) {
	const route = getFastPathRoute(element);
	if (route === null) return void 0;
	for (const localized of route.localized) {
		const suffix = matchFastPathPattern(localized.pattern, urlObj);
		if (suffix !== void 0) return applyFastPathPattern(route.base, suffix, urlObj);
	}
	const suffix = matchFastPathPattern(route.base, urlObj);
	if (suffix !== void 0) return applyFastPathPattern(route.base, suffix, urlObj);
}
/**
* @param {{ pattern: string; localized: Array<[string, string]> }} element
* @returns {FastPathRoute | null}
*/
function getFastPathRoute(element) {
	const cached = fastPathRouteCache.get(element);
	if (cached !== void 0) return cached;
	const base = parseFastPathPattern(element.pattern);
	if (base === void 0) {
		fastPathRouteCache.set(element, null);
		return null;
	}
	const localized = [];
	for (const [locale, pattern] of element.localized) {
		const parsed = parseFastPathPattern(pattern);
		if (parsed === void 0 || parsed.pathMode !== base.pathMode) {
			fastPathRouteCache.set(element, null);
			return null;
		}
		localized.push({
			locale,
			pattern: parsed
		});
	}
	const route = {
		base,
		localized
	};
	fastPathRouteCache.set(element, route);
	return route;
}
/**
* Parse only catch-all path patterns. In particular, do not treat `:path(.)?`
* as a catch-all: URLPattern's `(.)` means exactly one character and cannot be
* represented by this prefix matcher without changing routing semantics.
*
* @param {string} pattern
* @returns {FastPathPattern | undefined}
*/
function parseFastPathPattern(pattern) {
	const wildcard = pattern.match(/\/:path(?:\(\.\*\)(?:\?)?|\*)$/);
	if (wildcard === null || wildcard.index === void 0) return void 0;
	const originAndPath = parseFastPathOriginAndPath(pattern.slice(0, wildcard.index));
	if (originAndPath === void 0) return void 0;
	const pathMode = wildcard[0].endsWith("*") ? "segments" : wildcard[0].endsWith("?") ? "catch-all-optional" : "catch-all-required";
	return {
		...originAndPath,
		pathMode
	};
}
/**
* @param {string} prefix
* @returns {FastPathPattern | undefined}
*/
function parseFastPathOriginAndPath(prefix) {
	if (prefix === "" || prefix.startsWith("/")) {
		if (hasUrlPatternSyntax(prefix)) return void 0;
		return {
			protocol: void 0,
			hostname: void 0,
			port: void 0,
			pathnamePrefix: normalizePathPrefix(prefix),
			pathMode: "catch-all-optional"
		};
	}
	const dynamicProtocol = prefix.match(/^:protocol:\/\/([^/]+)(\/.*)?$/);
	const staticOrigin = prefix.match(/^([A-Za-z][A-Za-z\d+.-]*):\/\/([^/]+)(\/.*)?$/);
	if (dynamicProtocol !== null) {
		const hostMatch = (dynamicProtocol[1] ?? "").match(/^([^:(){}?*+]+)(?::(\d+))?$/);
		if (hostMatch === null || dynamicProtocol[2] !== void 0 && hasUrlPatternSyntax(dynamicProtocol[2])) return;
		return {
			protocol: void 0,
			hostname: (hostMatch[1] ?? "").toLowerCase(),
			port: hostMatch[2],
			pathnamePrefix: normalizePathPrefix(dynamicProtocol[2] ?? ""),
			pathMode: "catch-all-optional"
		};
	}
	if (staticOrigin === null) return void 0;
	const host = staticOrigin[2] ?? "";
	const pathname = staticOrigin[3];
	const hostMatch = host.match(/^([^:(){}?*+]+)(?::(\d+))?$/);
	if (hostMatch === null || pathname !== void 0 && hasUrlPatternSyntax(pathname)) return;
	return {
		protocol: `${staticOrigin[1]}:`,
		hostname: (hostMatch[1] ?? "").toLowerCase(),
		port: normalizePatternPort(hostMatch[2], `${staticOrigin[1]}:`),
		pathnamePrefix: normalizePathPrefix(pathname ?? ""),
		pathMode: "catch-all-optional"
	};
}
/**
* @param {string | undefined} port
* @param {string} protocol
* @returns {string | undefined}
*/
function normalizePatternPort(port, protocol) {
	if (port === "80" && protocol === "http:") return "";
	if (port === "443" && protocol === "https:") return "";
	return port;
}
/**
* @param {string} value
* @returns {boolean}
*/
function hasUrlPatternSyntax(value) {
	return /[:(){}?*+]/.test(value);
}
/**
* @param {string} pathname
* @returns {string}
*/
function normalizePathPrefix(pathname) {
	if (pathname === "" || pathname === "/") return "/";
	return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
/**
* @param {FastPathPattern} pattern
* @param {URL} urlObj
* @returns {string | undefined}
*/
function matchFastPathPattern(pattern, urlObj) {
	if (pattern.protocol !== void 0 && pattern.protocol !== urlObj.protocol) return;
	if (pattern.hostname !== void 0 && pattern.hostname !== urlObj.hostname.toLowerCase()) return;
	if (pattern.hostname !== void 0) {
		if ((pattern.port ?? defaultPortForProtocol(pattern.protocol ?? urlObj.protocol)) !== urlObj.port) return void 0;
	}
	const prefix = pattern.pathnamePrefix;
	if (prefix === "/") {
		if (urlObj.pathname.startsWith("//")) return void 0;
		if (pattern.pathMode === "segments") return isNonEmptyPathSegments(urlObj.pathname) ? urlObj.pathname : void 0;
		return urlObj.pathname;
	}
	if (urlObj.pathname === prefix) return pattern.pathMode === "catch-all-required" ? void 0 : "";
	if (urlObj.pathname.startsWith(`${prefix}/`)) {
		const suffix = urlObj.pathname.slice(prefix.length);
		if (suffix.startsWith("//")) return void 0;
		if (pattern.pathMode === "segments" && !isNonEmptyPathSegments(suffix)) return;
		return suffix;
	}
}
/**
* @param {string} pathname
* @returns {boolean}
*/
function isNonEmptyPathSegments(pathname) {
	return pathname.length > 1 && !pathname.endsWith("/") && !pathname.includes("//");
}
/**
* URLPattern treats the default port as empty in URL instances.
*
* @param {string} protocol
* @returns {string}
*/
function defaultPortForProtocol(protocol) {
	if (protocol === "http:") return "";
	if (protocol === "https:") return "";
	return "";
}
/**
* @param {FastPathPattern} pattern
* @param {string} suffix
* @param {URL} source
* @returns {URL}
*/
function applyFastPathPattern(pattern, suffix, source) {
	const localized = new URL(source.href);
	if (pattern.protocol !== void 0) localized.protocol = pattern.protocol;
	if (pattern.hostname !== void 0) {
		localized.hostname = pattern.hostname;
		localized.port = pattern.port ?? defaultPortForProtocol(localized.protocol);
	}
	localized.pathname = joinFastPathPrefix(pattern.pathnamePrefix, suffix);
	return localized;
}
/**
* @param {string} prefix
* @param {string} suffix
* @returns {string}
*/
function joinFastPathPrefix(prefix, suffix) {
	if (prefix === "/") return suffix === "" ? "/" : suffix;
	if (suffix === "") return prefix;
	return `${prefix}${suffix.startsWith("/") ? suffix : `/${suffix}`}`;
}
/** @type {string | undefined} */
var cachedRouteStrategyUrl;
/** @type {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined} */
var cachedRouteStrategy;
/**
* Match route policy against both the public URL and its canonical URL.
*
* The function is deliberately separate from variables.js: configuration is
* inert data, while canonicalization and route selection form a routing layer.
*
* @param {string | URL} url
* @returns {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined}
*/
function findMatchingRouteStrategy(url) {
	if (routeStrategies.length === 0) return;
	const urlString = typeof url === "string" ? url : url.href;
	if (cachedRouteStrategyUrl === urlString) return cachedRouteStrategy;
	const publicUrl = normalizeTrailingSlash(new URL(urlString, "http://example.com"));
	const canonicalUrl = deLocalizeUrl(publicUrl);
	const candidateUrls = canonicalUrl.href === publicUrl.href ? [publicUrl] : [publicUrl, canonicalUrl];
	let match;
	for (const candidateUrl of candidateUrls) {
		for (const routeStrategy of routeStrategies) if (execUrlPattern(new URLPattern(routeStrategy.match, candidateUrl.href), candidateUrl)) {
			match = routeStrategy;
			break;
		}
		if (match) break;
	}
	cachedRouteStrategyUrl = urlString;
	cachedRouteStrategy = match;
	return match;
}
/**
* Returns the strategy to use for a specific URL.
*
* If no route strategy matches (or the matching rule is `exclude: true`),
* the global strategy is returned.
*
* @param {string | URL} url
* @returns {typeof strategy}
*/
function getStrategyForUrl(url) {
	const routeStrategy = findMatchingRouteStrategy(url);
	if (routeStrategy && routeStrategy.exclude !== true && Array.isArray(routeStrategy.strategy)) return routeStrategy.strategy;
	return strategy;
}
/**
* Returns whether the given URL is excluded from middleware i18n processing.
*
* @param {string | URL} url
* @returns {boolean}
*/
function isExcludedByRouteStrategy(url) {
	return findMatchingRouteStrategy(url)?.exclude === true;
}
/**
* @typedef {object} ShouldRedirectServerInput
* @property {Request} request
* @property {string | URL} [effectiveRequestUrl] - Effective request URL to use for route matching, locale detection with the URL strategy, and redirect targets.
* @property {Locale} [locale]
*
* @typedef {object} ShouldRedirectClientInput
* @property {undefined} [request]
* @property {string | URL} [url]
* @property {Locale} [locale]
*
* @typedef {ShouldRedirectServerInput | ShouldRedirectClientInput} ShouldRedirectInput
*
* @typedef {object} ShouldRedirectResult
* @property {boolean} shouldRedirect - Indicates whether the consumer should perform a redirect.
* @property {Locale} locale - Locale resolved using the configured strategies.
* @property {URL | undefined} redirectUrl - Destination URL when a redirect is required.
*/
/**
* Determines whether a redirect is required to align the current URL with the active locale.
*
* This helper mirrors the logic that powers `paraglideMiddleware`, but works in both server
* and client environments. It evaluates the configured strategies in order, computes the
* canonical localized URL, and reports when the current URL does not match.
*
* When called in the browser without arguments, the current `window.location.href` is used.
*
* @see https://paraglidejs.com/i18n-routing#redirects
*
* @example
* // Client side usage (e.g. TanStack Router beforeLoad hook)
* async function beforeLoad({ location }) {
*   const decision = await shouldRedirect({ url: location.href });
*
*   if (decision.shouldRedirect) {
*     throw redirect({ to: decision.redirectUrl.href });
*   }
* }
*
* @example
* // Server side usage with a Request
* export async function handle(request) {
*   const decision = await shouldRedirect({ request });
*
*   if (decision.shouldRedirect) {
*     return Response.redirect(decision.redirectUrl, 307);
*   }
*
*   return render(request, decision.locale);
* }
*
* @example
* // Server side usage behind a proxy where request.url is not public-facing
* export async function handle(request) {
*   const effectiveRequestUrl = new URL(request.url);
*   effectiveRequestUrl.protocol = "https:";
*   effectiveRequestUrl.host = "example.com";
*
*   const decision = await shouldRedirect({
*     request,
*     effectiveRequestUrl,
*   });
*
*   if (decision.shouldRedirect) {
*     return Response.redirect(decision.redirectUrl, 307);
*   }
* }
*
* @param {ShouldRedirectInput} [input]
* @returns {Promise<ShouldRedirectResult>}
*/
async function shouldRedirect$1(input = {}) {
	const currentUrl = resolveUrl(input);
	const locale = await resolveLocale(input, currentUrl);
	const strategy = getStrategyForUrl(currentUrl.href);
	if (isExcludedByRouteStrategy(currentUrl.href) || !strategy.includes("url")) return {
		shouldRedirect: false,
		locale,
		redirectUrl: void 0
	};
	const localizedUrl = localizeUrl(currentUrl.href, { locale });
	const shouldRedirectToLocalizedUrl = normalizeUrl(localizedUrl.href) !== normalizeUrl(currentUrl.href);
	return {
		shouldRedirect: shouldRedirectToLocalizedUrl,
		locale,
		redirectUrl: shouldRedirectToLocalizedUrl ? localizedUrl : void 0
	};
}
/**
* Resolves the locale either from the provided input or by using the configured strategies.
*
* @param {ShouldRedirectInput} input
* @param {URL} currentUrl
* @returns {Promise<Locale>}
*/
async function resolveLocale(input, currentUrl) {
	const locale = toLocale(input.locale);
	if (locale) return locale;
	if (input.request) return extractLocaleFromRequestAsync(input.request, { effectiveRequestUrl: currentUrl });
	if ("url" in input && typeof input.url !== "undefined") return getLocaleForUrl(currentUrl.href);
	return getLocale();
}
/**
* Resolves the current URL from the provided input or runtime context.
*
* @param {ShouldRedirectInput} input
* @returns {URL}
*/
function resolveUrl(input) {
	if ("effectiveRequestUrl" in input && input.effectiveRequestUrl instanceof URL) return new URL(input.effectiveRequestUrl.href);
	if ("effectiveRequestUrl" in input && typeof input.effectiveRequestUrl === "string") return new URL(input.effectiveRequestUrl, input.request ? input.request.url : getUrlOrigin());
	if (input.request) return new URL(input.request.url);
	if ("url" in input && input.url instanceof URL) return new URL(input.url.href);
	if ("url" in input && typeof input.url === "string") return new URL(input.url, getUrlOrigin());
	if (typeof window !== "undefined" && window?.location?.href) return new URL(window.location.href);
	throw new Error("shouldRedirect() requires either a request, an absolute URL, or must run in a browser environment.");
}
/**
* Normalize url for comparison by stripping the trailing slash.
*
* @param {string} url
* @returns {string}
*/
function normalizeUrl(url) {
	return new URL(url).href;
}
/**
* High-level URL localization function optimized for client-side UI usage.
*
* This is a convenience wrapper around `localizeUrl()` that provides features
* needed in UI:
*
* - Accepts relative paths (e.g., "/about")
* - Returns relative paths when possible
* - Automatically detects current locale if not specified
* - Handles string input/output instead of URL objects
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // In a React/Vue/Svelte component
* const NavLink = ({ href }) => {
*   // Automatically uses current locale, keeps path relative
*   return <a href={localizeHref(href)}>...</a>;
* };
*
* // Examples:
* localizeHref("/about")
* // => "/de/about" (if current locale is "de")
* localizeHref("/store", { locale: "fr" })
* // => "/fr/store" (explicit locale)
*
* // Cross-origin links remain absolute
* localizeHref("https://other-site.com/about")
* // => "https://other-site.com/de/about"
* ```
*
* For server-side URL localization (e.g., in middleware), use `localizeUrl()`
* which provides more precise control over URL handling.
*
* @param {string} href - The href to localize (can be relative or absolute)
* @param {object} [options] - Options for localization
* @param {Locale} [options.locale] - Target locale. If not provided, uses `getLocale()`
* @returns {string} The localized href, relative if input was relative
*/
function localizeHref(href, options) {
	const currentLocale = getLocale();
	const locale = options?.locale ?? currentLocale;
	const url = new URL(href, getUrlOrigin());
	const localized = localizeUrl(url, { locale });
	if (href.startsWith("/") && url.origin === localized.origin) {
		if (locale !== currentLocale) {
			if (localizeUrl(url, { locale: currentLocale }).origin !== localized.origin) return localized.href;
		}
		return localized.pathname + localized.search + localized.hash;
	}
	return localized.href;
}
/**
* @typedef {"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage"} BuiltInStrategy
*/
/**
* @typedef {`custom_${string}`} CustomStrategy
*/
/**
* @typedef {BuiltInStrategy | CustomStrategy} Strategy
*/
/**
* @typedef {Array<Strategy>} Strategies
*/
/**
* @typedef {{ getLocale: (request?: Request) => Promise<string | undefined> | (string | undefined) }} CustomServerStrategyHandler
*/
/**
* @typedef {{ getLocale: () => Promise<string|undefined> | (string | undefined), setLocale: (locale: string) => Promise<void> | void }} CustomClientStrategyHandler
*/
/** @type {Map<string, CustomServerStrategyHandler>} */
var customServerStrategies = /* @__PURE__ */ new Map();
/** @type {Map<string, CustomClientStrategyHandler>} */
var customClientStrategies = /* @__PURE__ */ new Map();
/**
* Checks if the given strategy is a custom strategy.
*
* @param {unknown} strategy The name of the custom strategy to validate.
* Must be a string that starts with "custom-" followed by alphanumeric characters, hyphens, or underscores.
* @returns {boolean} Returns true if it is a custom strategy, false otherwise.
*/
function isCustomStrategy(strategy) {
	return typeof strategy === "string" && /^custom-[A-Za-z0-9_-]+$/.test(strategy);
}
/**
* A locale that is available in the project.
*
* @example
*   setLocale(request.locale as Locale)
*
* @typedef {typeof locales[number]} Locale
*/
/**
* A branded type representing a localized string.
*
* Message functions return this type instead of \`string\`, enabling TypeScript
* to distinguish translated strings from regular strings at compile time.
* This allows you to enforce that only properly localized content is used
* in your UI components.
*
* Since \`LocalizedString\` is a branded subtype of \`string\`, it remains fully
* backward compatible—you can pass it anywhere a \`string\` is expected.
*
* @example
*   // Enforce localized strings in your components
*   function PageTitle(props: { title: LocalizedString }) {
*     return <h1>{props.title}</h1>
*   }
*
*   // ✅ Correct: using a message function
*   <PageTitle title={m.welcome_title()} />
*
*   // ❌ Type error: raw strings are not LocalizedString
*   <PageTitle title="Welcome" />
*
* @example
*   // LocalizedString is assignable to string (backward compatible)
*   const localized: LocalizedString = m.greeting()
*   const str: string = localized  // ✅ works fine
*
*   // But string is not assignable to LocalizedString
*   const raw: LocalizedString = "Hello"  // ❌ Type error
*
* @example
*   // Catches accidental string concatenation
*   function showMessage(msg: LocalizedString) { ... }
*
*   showMessage(m.hello())                    // ✅
*   showMessage("Hello " + userName)          // ❌ Type error
*   showMessage(m.hello_user({ name: userName }))  // ✅ use params instead
*
* @typedef {string & { readonly __brand: 'LocalizedString' }} LocalizedString
*/
/**
* A single markup option passed to a tag instance.
*
* @typedef {{
*   name: string;
*   value: unknown;
* }} MessageMarkupOption
*/
/**
* A single static markup attribute attached to a tag instance.
*
* @typedef {{
*   name: string;
*   value: string | true;
* }} MessageMarkupAttribute
*/
/**
* Record of markup options for a tag instance.
*
* @typedef {Record<string, unknown>} MessageMarkupOptions
*/
/**
* Record of markup attributes for a tag instance.
*
* @typedef {Record<string, string | true>} MessageMarkupAttributes
*/
/**
* Type-level schema for a single markup tag.
*
* @typedef {{
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
*   children: boolean;
* }} MessageMarkupTag
*/
/**
* Type-level schema for all markup tags in a message.
*
* @typedef {Record<string, MessageMarkupTag>} MessageMarkupSchema
*/
/**
* Type-only metadata attached to compiled message functions.
*
* @template Inputs
* @template Options
* @template {MessageMarkupSchema} [Markup = MessageMarkupSchema]
* @typedef {{
*   readonly __paraglide?: {
*     inputs: Inputs;
*     options: Options;
*     markup: Markup;
*   };
* }} MessageMetadata
*/
/**
* A compiled, framework-neutral message part.
*
* @typedef {{
*   type: "text";
*   value: string;
* } | {
*   type: "markup-start";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* } | {
*   type: "markup-end";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* } | {
*   type: "markup-standalone";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* }} MessagePart
*/
/**
* A message function is a message for a specific locale.
*
* @example
*   m.hello({ name: 'world' })
*
* @typedef {(inputs?: Record<string, never>) => LocalizedString} MessageFunction
*/
/**
* A message bundle function that selects the message to be returned.
*
* Uses `getLocale()` under the hood to determine the locale with an option.
*
* @template {string} T
*
* @example
*   *   m.hello({ name: 'world' }, { locale: "en" })
*
* @typedef {(params: Record<string, never>, options: { locale: T }) => LocalizedString} MessageBundleFunction
*/
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/locale.ts
/** The locale's name in its own language (its endonym), from the runtime's CLDR data. */
function localeName(locale, inLocale = locale) {
	return new Intl.DisplayNames([inLocale], { type: "language" }).of(locale) ?? locale;
}
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/paraglide/server.js
/**
* Server middleware that handles locale-based routing and request processing.
*
* Configure `disableAsyncLocalStorage` when generating Paraglide with
* `paraglideVitePlugin()` or `compile()`, not when calling
* `paraglideMiddleware()`. Keep AsyncLocalStorage enabled by default and
* only disable it for runtimes that lack `AsyncLocalStorage` support and
* guarantee request isolation.
*
* This middleware performs several key functions:
*
* 1. Determines the locale for the incoming request using configured strategies
* 2. Handles URL localization and redirects (only for document requests)
* 3. Maintains locale state using AsyncLocalStorage to prevent request interference
*
* When URL strategy is used:
*
* - The locale is extracted from the URL for all request types
* - If URL doesn't match the determined locale, redirects to localized URL (only for document requests)
* - De-localizes URLs before passing to server (e.g., `/fr/about` → `/about`)
*
* @see https://paraglidejs.com/middleware
*
* @template T - The return type of the resolve function
*
* @param {Request} request - The incoming request object
* @param {(args: { request: Request, locale: import("./runtime.js").Locale }) => T | Promise<T>} resolve - Function to handle the request. The callback receives:
*   - `request`: A modified request with a delocalized URL when the URL strategy is used (e.g., `/fr/about` → `/about`).
*      If your framework handles URL localization itself (e.g., TanStack Router's `rewrite` option), use the original
*      request instead to avoid redirect loops.
*   - `locale`: The determined locale for this request.
* @param {{
*   effectiveRequestUrl?: string | URL | ((request: Request) => string | URL),
*   onRedirect?: (response: Response) => void
* }} [options] - Options to control middleware behavior. `effectiveRequestUrl` sets the effective request URL used for route matching, URL-based locale detection, redirects, and `getUrlOrigin()`.
* @returns {Promise<Response>}
*
* @example
* ```typescript
* // Basic usage in metaframeworks like NextJS, SvelteKit, Astro, Nuxt, etc.
* export const handle = async ({ event, resolve }) => {
*   return paraglideMiddleware(event.request, ({ request, locale }) => {
*     // let the framework further resolve the request
*     return resolve(request);
*   });
* };
* ```
*
* @example
* ```typescript
* // Usage in a framework like Express JS or Hono
* app.use(async (req, res, next) => {
*   const result = await paraglideMiddleware(req, ({ request, locale }) => {
*     // If a redirect happens this won't be called
*     return next(request);
*   });
* });
* ```
*
* @example
* ```typescript
* // Usage with frameworks that handle URL localization/delocalization themselves
* //
* // Some frameworks like TanStack Router handle URL localization and delocalization
* // themselves via their own rewrite APIs (e.g., `rewrite.input`/`rewrite.output`).
* //
* // When the framework handles this, the middleware's URL delocalization is not needed.
* // Using the modified `request` from the callback would cause a redirect loop because
* // both the middleware and the framework would attempt to delocalize the URL.
* //
* // Solution: Pass the original request to the handler instead of the modified one.
* // The middleware still handles locale detection, cookies, and AsyncLocalStorage context.
* //
* // ❌ WRONG - causes redirect loop when framework handles URL rewriting:
* // paraglideMiddleware(req, ({ request }) => handler.fetch(request))
* //
* // ✅ CORRECT - use original request when framework handles URL localization:
* // paraglideMiddleware(req, () => handler.fetch(req))
*
* * *
* export default {
*   fetch(req: Request): Promise<Response> {
*     // TanStack Router handles URL rewriting via deLocalizeUrl/localizeUrl
*     // so we pass the original `req` instead of the modified `request`
*     return paraglideMiddleware(req, () => handler.fetch(req))
*   },
* }
* ```
*/
async function paraglideMiddleware(request, resolve, options) {
	let requestAsyncLocalStorage = serverAsyncLocalStorage;
	requestAsyncLocalStorage = getServerAsyncLocalStorage();
	if (!requestAsyncLocalStorage) {
		const { AsyncLocalStorage } = await import("async_hooks");
		requestAsyncLocalStorage = getServerAsyncLocalStorage();
		if (!requestAsyncLocalStorage) {
			requestAsyncLocalStorage = new AsyncLocalStorage();
			overwriteServerAsyncLocalStorage(requestAsyncLocalStorage);
		}
	}
	if (!requestAsyncLocalStorage) {
		requestAsyncLocalStorage = createMockAsyncLocalStorage();
		overwriteServerAsyncLocalStorage(requestAsyncLocalStorage);
	}
	const url = resolveMiddlewareUrl(request, options?.effectiveRequestUrl);
	const origin = url.origin;
	if (isExcludedByRouteStrategy(url.href)) {
		const locale = "en";
		const newRequest = cloneRequestWithFallback(request, url);
		/** @type {Set<string>} */
		const messageCalls = /* @__PURE__ */ new Set();
		return await requestAsyncLocalStorage?.run({
			locale,
			origin,
			messageCalls
		}, () => resolve({
			locale,
			request: newRequest
		}));
	}
	const strategy = getStrategyForUrl(url.href);
	const decision = await shouldRedirect$1({
		request,
		effectiveRequestUrl: url
	});
	const locale = decision.locale;
	if (request.headers.get("Sec-Fetch-Dest") === "document" && decision.shouldRedirect && decision.redirectUrl) {
		/** @type {Record<string, string>} */
		const headers = {};
		if (strategy.includes("preferredLanguage")) headers["Vary"] = "Accept-Language";
		const response = new Response(null, {
			status: 307,
			headers: {
				Location: decision.redirectUrl.href,
				...headers
			}
		});
		options?.onRedirect?.(response);
		return response;
	}
	let newRequest;
	if (strategy.includes("url")) newRequest = cloneRequestWithFallback(request, deLocalizeUrl(url));
	else newRequest = cloneRequestWithFallback(request, url);
	/** @type {Set<string>} */
	const messageCalls = /* @__PURE__ */ new Set();
	return await requestAsyncLocalStorage?.run({
		locale,
		origin,
		messageCalls
	}, () => resolve({
		locale,
		request: newRequest
	}));
}
/**
* @param {Request} request
* @param {string | URL | ((request: Request) => string | URL) | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveMiddlewareUrl(request, effectiveRequestUrl) {
	if (typeof effectiveRequestUrl === "function") return new URL(effectiveRequestUrl(request), request.url);
	if (typeof effectiveRequestUrl === "string" || effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl, request.url);
	return new URL(request.url);
}
/**
* Some metaframeworks (NextJS) require a new Request object.
* https://github.com/opral/inlang-paraglide-js/issues/411
*
* However, some frameworks (TanStack Start 1.143+) use custom Request
* implementations that cannot be cloned with `new Request(request)`.
* https://github.com/opral/paraglide-js/issues/573
*
* Effective request URL overrides behind proxies:
* https://github.com/opral/paraglide-js/issues/652
*
* @param {Request} request
* @param {string | URL} [url]
* @returns {Request}
*/
function cloneRequestWithFallback(request, url = request.url) {
	const targetUrl = typeof url === "string" ? url : url.href;
	if (targetUrl === request.url) try {
		return new Request(request.clone());
	} catch {
		try {
			return new Request(request);
		} catch {
			return request;
		}
	}
	try {
		return new Request(targetUrl, request.clone());
	} catch {
		try {
			return new Request(targetUrl, request);
		} catch {
			return request;
		}
	}
}
/**
* Creates a mock AsyncLocalStorage implementation for environments where
* native AsyncLocalStorage is not available or disabled.
*
* This mock implementation mimics the behavior of the native AsyncLocalStorage
* but doesn't require the async_hooks module. It's used as a fallback when
* the runtime does not expose AsyncLocalStorage or when it has been disabled.
*
* @returns {import("./runtime.js").ParaglideAsyncLocalStorage}
*/
function createMockAsyncLocalStorage() {
	/** @type {any} */
	let currentStore = void 0;
	return {
		getStore() {
			return currentStore;
		},
		async run(store, callback) {
			currentStore = store;
			try {
				return await callback();
			} finally {
				currentStore = void 0;
			}
		}
	};
}
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/seo.ts
/**
* Self-canonical URL and reciprocal hreflang links for a public path, from Paraglide's URL
* patterns. `x-default` is the un-localized entry URL, which redirects to the visitor's
* language. Pure: usable in a request, at build time and in the browser.
*/
function alternates(origin, path, locale) {
	const entry = new URL(path || "/", origin);
	const href = (value) => localizeUrl(entry, { locale: value }).href;
	return {
		canonical: href(locale),
		alternates: [...locales.map((value) => ({
			hrefLang: value,
			href: href(value)
		})), {
			hrefLang: "x-default",
			href: entry.href
		}]
	};
}
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/react-router.tsx
/** Root middleware: scopes Paraglide's locale to the request and redirects un-localized document requests to the visitor's language. */
function languageMiddleware({ request }, next) {
	return paraglideMiddleware(request, () => next());
}
/** Title, description, self-canonical and reciprocal hreflang links for a localized public route. */
function pageMeta$1(params, origin, path, title, description, brand = "Remy") {
	const locale = isLocale(params.locale) ? params.locale : "en";
	const links = alternates(origin, path, locale);
	return [
		{ title: `${title(locale)} | ${brand}` },
		{
			name: "description",
			content: description(locale)
		},
		{
			tagName: "link",
			rel: "canonical",
			href: links.canonical
		},
		...links.alternates.map((link) => ({
			tagName: "link",
			rel: "alternate",
			hrefLang: link.hrefLang,
			href: link.href
		}))
	];
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	middleware: () => middleware
});
/** At build time the prerenderer runs this per URL, so Paraglide's getLocale() sees each page's locale. */
var middleware = [languageMiddleware];
function Layout({ children }) {
	const locale = getLocale();
	return /* @__PURE__ */ jsxs("html", {
		lang: locale,
		dir: getTextDirection(locale),
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	const locale = getLocale();
	const missing = isRouteErrorResponse(error) && error.status === 404;
	return /* @__PURE__ */ jsxs("main", {
		className: "error-page",
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "noindex"
			}),
			/* @__PURE__ */ jsx("title", { children: missing ? m.not_found({}, { locale }) : m.error_title({}, { locale }) }),
			/* @__PURE__ */ jsx("h1", { children: missing ? m.not_found({}, { locale }) : m.error_title({}, { locale }) }),
			/* @__PURE__ */ jsx("p", { children: missing ? m.not_found_detail({}, { locale }) : m.error_detail({}, { locale }) }),
			/* @__PURE__ */ jsx("a", {
				href: `/${locale}`,
				children: m.home_link({}, { locale })
			})
		]
	});
});
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/paraglide/messages/continue_in.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ language: NonNullable<unknown> }} Continue_InInputs */
var en_continue_in = (i) => {
	return `Continue in ${i?.language}`;
};
var es_continue_in = (i) => {
	return `Continuar en ${i?.language}`;
};
var ar_continue_in = (i) => {
	return `تابع باللغة ${i?.language}`;
};
/**
* | output |
* | --- |
* | "Continue in {language}" |
*
* @param {Continue_InInputs} inputs
* @param {{ locale?: "en" | "es" | "ar" }} options
* @returns {LocalizedString}
*/
var continue_in = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "es") return es_continue_in(inputs);
	if (locale === "ar") return ar_continue_in(inputs);
	return en_continue_in(inputs);
});
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/paraglide/messages/keep_language.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ language: NonNullable<unknown> }} Keep_LanguageInputs */
var en_keep_language = (i) => {
	return `Keep ${i?.language}`;
};
var es_keep_language = (i) => {
	return `Seguir en ${i?.language}`;
};
var ar_keep_language = (i) => {
	return `ابقَ على ${i?.language}`;
};
/**
* | output |
* | --- |
* | "Keep {language}" |
*
* @param {Keep_LanguageInputs} inputs
* @param {{ locale?: "en" | "es" | "ar" }} options
* @returns {LocalizedString}
*/
var keep_language = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "es") return es_keep_language(inputs);
	if (locale === "ar") return ar_keep_language(inputs);
	return en_keep_language(inputs);
});
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/paraglide/messages/language_hint.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ language: NonNullable<unknown> }} Language_HintInputs */
var en_language_hint = (i) => {
	return `This page is also available in ${i?.language}.`;
};
var es_language_hint = (i) => {
	return `Esta página también está disponible en ${i?.language}.`;
};
var ar_language_hint = (i) => {
	return `هذه الصفحة متاحة أيضًا باللغة ${i?.language}.`;
};
/**
* | output |
* | --- |
* | "This page is also available in {language}." |
*
* @param {Language_HintInputs} inputs
* @param {{ locale?: "en" | "es" | "ar" }} options
* @returns {LocalizedString}
*/
var language_hint = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "es") return es_language_hint(inputs);
	if (locale === "ar") return ar_language_hint(inputs);
	return en_language_hint(inputs);
});
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/paraglide/messages/language_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Language_LabelInputs */
var en_language_label = () => {
	return `Language`;
};
var es_language_label = () => {
	return `Idioma`;
};
var ar_language_label = () => {
	return `اللغة`;
};
/**
* | output |
* | --- |
* | "Language" |
*
* @param {Language_LabelInputs} inputs
* @param {{ locale?: "en" | "es" | "ar" }} options
* @returns {LocalizedString}
*/
var language_label = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "es") return es_language_label(inputs);
	if (locale === "ar") return ar_language_label(inputs);
	return en_language_label(inputs);
});
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/language.tsx
/** Links to every language version of the current path, marking the current one. */
function LanguageSwitcher({ locale, path = "" }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": language_label({}, { locale }),
		className: "languages",
		children: locales.map((value) => /* @__PURE__ */ jsx("a", {
			href: localizeHref(path || "/", { locale: value }),
			lang: value,
			hrefLang: value,
			"aria-current": value === locale ? "page" : void 0,
			onClick: () => setLocale(value, { reload: false }),
			children: localeName(value)
		}, value))
	});
}
/** Offers the visitor's preferred language without redirecting; dismissing remembers the current one. */
function LanguageHint({ locale, path = "", preferred }) {
	const [dismissed, setDismissed] = useState(false);
	if (!preferred || preferred === locale || dismissed) return null;
	return /* @__PURE__ */ jsxs("aside", {
		className: "language-hint",
		lang: preferred,
		dir: getTextDirection(preferred),
		children: [
			/* @__PURE__ */ jsx("span", { children: language_hint({ language: localeName(preferred) }, { locale: preferred }) }),
			/* @__PURE__ */ jsx("a", {
				href: localizeHref(path || "/", { locale: preferred }),
				hrefLang: preferred,
				onClick: () => setLocale(preferred, { reload: false }),
				children: continue_in({ language: localeName(preferred) }, { locale: preferred })
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				lang: locale,
				dir: getTextDirection(locale),
				onClick: () => {
					setLocale(locale, { reload: false });
					setDismissed(true);
				},
				children: keep_language({ language: localeName(locale) }, { locale })
			})
		]
	});
}
//#endregion
//#region app/origin.ts
/** The public origin for canonical and alternate links; a build-time value because no request exists when prerendering. */
var origin = "http://127.0.0.1:4174";
//#endregion
//#region app/entry.tsx
/** Metadata for an entry URL without a locale: canonical to itself, every language version linked, x-default to itself. */
function entryMeta(path) {
	const locale = baseLocale;
	return [
		{ title: `${m.language_label({}, { locale })} | Remy` },
		{
			name: "description",
			content: m.home_description({}, { locale })
		},
		{
			tagName: "link",
			rel: "canonical",
			href: `${origin}${path || "/"}`
		},
		...alternates(origin, path, locale).alternates.map((link) => ({
			tagName: "link",
			rel: "alternate",
			hrefLang: link.hrefLang,
			href: link.href
		}))
	];
}
/**
* Prerendered as a plain list of every language version; in the browser Paraglide resolves
* the visitor's language (remembered choice, then the browser's languages, else the base
* locale) and the page moves there, exactly as remy-auth's server middleware does.
*/
function Entry({ path }) {
	useEffect(() => {
		shouldRedirect().then((decision) => {
			if (decision.shouldRedirect && decision.redirectUrl) location.replace(decision.redirectUrl.href);
		});
	}, [path]);
	return /* @__PURE__ */ jsxs("main", {
		id: "main",
		className: "entry",
		children: [/* @__PURE__ */ jsx("h1", { children: m.language_label({}, { locale: baseLocale }) }), /* @__PURE__ */ jsx(LanguageSwitcher, {
			locale: baseLocale,
			path
		})]
	});
}
//#endregion
//#region app/routes/choose.tsx
var choose_exports = /* @__PURE__ */ __exportAll({
	default: () => choose_default,
	meta: () => meta$4
});
function meta$4() {
	return entryMeta("");
}
var choose_default = UNSAFE_withComponentProps(function Choose() {
	return /* @__PURE__ */ jsx(Entry, { path: "" });
});
//#endregion
//#region app/routes/unprefixed.tsx
var unprefixed_exports = /* @__PURE__ */ __exportAll({
	default: () => unprefixed_default,
	meta: () => meta$3
});
function meta$3({ location }) {
	return entryMeta(location.pathname.replace(/\/+$/, ""));
}
var unprefixed_default = UNSAFE_withComponentProps(function Unprefixed() {
	return /* @__PURE__ */ jsx(Entry, { path: useLocation().pathname.replace(/\/+$/, "") });
});
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/components/button.tsx
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/client.tsx
var rememberedAtLoad = typeof document === "undefined" ? void 0 : extractLocaleFromCookie();
/** A language to offer on a localized page: the browser's language when it differs from the page and the last visited or chosen language is not already this one. */
function useSuggestedLocale(page) {
	const [suggested, setSuggested] = useState(void 0);
	useEffect(() => {
		const browser = extractLocaleFromNavigator();
		setSuggested(browser && browser !== page && rememberedAtLoad !== page ? browser : void 0);
	}, [page]);
	return suggested;
}
/** A moment in the device's own time zone, which only the browser knows; empty until hydration. */
function DeviceTime({ locale, instant, ...rest }) {
	const [text, setText] = useState("");
	useEffect(() => {
		setText(new Intl.DateTimeFormat(locale, {
			dateStyle: "full",
			timeStyle: "long"
		}).format(instant));
	}, [locale, instant]);
	return /* @__PURE__ */ jsx("span", {
		...rest,
		children: text
	});
}
//#endregion
//#region app/shell.tsx
function Shell({ locale, path = "", children }) {
	const preferred = useSuggestedLocale(locale);
	return /* @__PURE__ */ jsxs("div", {
		className: "site",
		children: [
			/* @__PURE__ */ jsx("a", {
				className: "skip-link",
				href: "#main",
				children: m.skip_link({}, { locale })
			}),
			/* @__PURE__ */ jsx(LanguageHint, {
				locale,
				path,
				preferred
			}),
			/* @__PURE__ */ jsxs("header", {
				className: "site-header",
				children: [/* @__PURE__ */ jsxs(Link, {
					className: "brand",
					to: `/${locale}`,
					children: [
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "brand-mark",
							children: "r"
						}),
						"remy",
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "brand-dot",
							children: "."
						})
					]
				}), /* @__PURE__ */ jsx(LanguageSwitcher, {
					locale,
					path
				})]
			}),
			/* @__PURE__ */ jsx("main", {
				id: "main",
				children
			}),
			/* @__PURE__ */ jsxs("footer", { children: [/* @__PURE__ */ jsxs("span", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getUTCFullYear(),
				" Remy"
			] }), /* @__PURE__ */ jsx("span", { children: m.footer({}, { locale }) })] })
		]
	});
}
//#endregion
//#region app/locale.ts
function requireLocale(value) {
	if (!isLocale(value)) throw new Response("Not found", { status: 404 });
	return value;
}
//#endregion
//#region app/seo.ts
/** Metadata for a prerendered localized route, with the build-time public origin. */
function pageMeta(params, path, title, description) {
	return pageMeta$1(params, origin, path, title, description);
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	loader: () => loader$4,
	meta: () => meta$2
});
function loader$4({ params }) {
	return { locale: requireLocale(params.locale) };
}
function meta$2({ params }) {
	return pageMeta(params, "", (locale) => m.home_title({}, { locale }), (locale) => m.home_description({}, { locale }));
}
var home_default = UNSAFE_withComponentProps(function Home({ loaderData: { locale } }) {
	const o = { locale };
	return /* @__PURE__ */ jsx(Shell, {
		locale,
		children: /* @__PURE__ */ jsxs("section", {
			className: "hero",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: m.public_label({}, o)
				}),
				/* @__PURE__ */ jsx("h1", { children: m.home_title({}, o) }),
				/* @__PURE__ */ jsx("p", {
					className: "intro",
					children: m.home_intro({}, o)
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "actions",
					children: [/* @__PURE__ */ jsx("a", {
						className: buttonVariants({ size: "lg" }),
						href: `/${locale}/demo`,
						children: m.demo_link({}, o)
					}), /* @__PURE__ */ jsx("a", {
						className: buttonVariants({
							size: "lg",
							variant: "outline"
						}),
						href: `/${locale}/formats`,
						children: m.formats_link({}, o)
					})]
				})
			]
		})
	});
});
//#endregion
//#region app/routes/demo.tsx
var demo_exports = /* @__PURE__ */ __exportAll({
	default: () => demo_default,
	loader: () => loader$3,
	meta: () => meta$1
});
function loader$3({ params }) {
	return { locale: requireLocale(params.locale) };
}
function meta$1({ params }) {
	return pageMeta(params, "/demo", (locale) => m.demo_title({}, { locale }), (locale) => m.demo_description({}, { locale }));
}
var demo_default = UNSAFE_withComponentProps(function Demo({ loaderData: { locale } }) {
	const o = { locale };
	const [count, setCount] = useState(0);
	const [errors, setErrors] = useState({});
	const [reservation, setReservation] = useState(null);
	function reserve(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const name = String(data.get("name") ?? "").trim();
		const guests = Number(data.get("guests"));
		const next = {};
		if (!name) next.name = m.name_required({}, o);
		if (!Number.isInteger(guests) || guests < 1 || guests > 20) next.guests = m.guests_invalid({}, o);
		setErrors(next);
		setReservation(Object.keys(next).length ? null : {
			name,
			count: guests
		});
	}
	return /* @__PURE__ */ jsx(Shell, {
		locale,
		path: "/demo",
		children: /* @__PURE__ */ jsxs("section", {
			className: "page",
			children: [
				/* @__PURE__ */ jsxs("a", {
					className: "back-link",
					href: `/${locale}`,
					children: [/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: "back-arrow"
					}), m.home_link({}, o)]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: m.demo_label({}, o)
				}),
				/* @__PURE__ */ jsx("h1", { children: m.demo_title({}, o) }),
				/* @__PURE__ */ jsx("p", {
					className: "intro",
					children: m.demo_description({}, o)
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "card",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "muted",
							children: m.count_label({}, o)
						}),
						/* @__PURE__ */ jsx("output", {
							"aria-live": "polite",
							className: "count",
							children: new Intl.NumberFormat(locale).format(count)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "actions",
							children: [/* @__PURE__ */ jsx(Button$1, {
								onClick: () => setCount((value) => value + 1),
								children: m.increment({}, o)
							}), /* @__PURE__ */ jsx(Button$1, {
								variant: "outline",
								onClick: () => setCount(0),
								disabled: count === 0,
								children: m.reset({}, o)
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					className: "card",
					noValidate: true,
					onSubmit: reserve,
					"aria-labelledby": "reserve-heading",
					children: [
						/* @__PURE__ */ jsx("h2", {
							id: "reserve-heading",
							children: m.form_heading({}, o)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "field",
							children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "name",
									children: m.name_label({}, o)
								}),
								/* @__PURE__ */ jsx("input", {
									id: "name",
									name: "name",
									dir: "auto",
									autoComplete: "name",
									"aria-invalid": errors.name ? true : void 0,
									"aria-describedby": errors.name ? "name-error" : void 0
								}),
								errors.name && /* @__PURE__ */ jsx("p", {
									id: "name-error",
									className: "field-error",
									children: errors.name
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "field",
							children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "guests",
									children: m.guests_label({}, o)
								}),
								/* @__PURE__ */ jsx("input", {
									id: "guests",
									name: "guests",
									type: "number",
									inputMode: "numeric",
									min: 1,
									max: 20,
									step: 1,
									defaultValue: 2,
									"aria-invalid": errors.guests ? true : void 0,
									"aria-describedby": errors.guests ? "guests-error" : void 0
								}),
								errors.guests && /* @__PURE__ */ jsx("p", {
									id: "guests-error",
									className: "field-error",
									children: errors.guests
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "actions",
							children: /* @__PURE__ */ jsx(Button$1, {
								type: "submit",
								children: m.submit({}, o)
							})
						}),
						/* @__PURE__ */ jsx("p", {
							role: "status",
							className: "reserved",
							children: reservation && m.reserved({
								name: reservation.name,
								count: reservation.count
							}, o)
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "muted small",
					children: m.demo_note({}, o)
				})
			]
		})
	});
});
//#endregion
//#region node_modules/@joeblew999/remy-ui/src/locale-info.ts
function localeInfo(locale) {
	const resolved = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions();
	const tag = new Intl.Locale(locale);
	const calendars = tag.getCalendars?.() ?? [resolved.calendar];
	const week = tag.getWeekInfo?.();
	return {
		calendar: resolved.calendar,
		otherCalendars: calendars.filter((calendar) => calendar !== resolved.calendar),
		numberingSystem: tag.getNumberingSystems?.()[0] ?? resolved.numberingSystem,
		hourCycle: resolved.hourCycle ?? "h23",
		firstDay: week?.firstDay,
		weekend: week?.weekend
	};
}
/** The localized name of an ISO weekday number (1 = Monday … 7 = Sunday). */
function weekdayName(locale, day) {
	return new Intl.DateTimeFormat(locale, {
		weekday: "long",
		timeZone: "UTC"
	}).format(new Date(Date.UTC(2024, 0, day)));
}
//#endregion
//#region app/samples.ts
var samples = {
	instant: /* @__PURE__ */ new Date("2026-09-24T09:30:00Z"),
	date: /* @__PURE__ */ new Date("2026-12-25T00:00:00Z"),
	days: 3,
	decimal: 12345.678,
	share: .256,
	big: 1234567,
	amount: 1234.5,
	counts: [
		0,
		1,
		2,
		3,
		11,
		100
	],
	positions: [
		1,
		2,
		3,
		4,
		11,
		22,
		103
	]
};
//#endregion
//#region app/routes/formats.tsx
var formats_exports = /* @__PURE__ */ __exportAll({
	default: () => formats_default,
	loader: () => loader$2,
	meta: () => meta
});
function loader$2({ params }) {
	const locale = requireLocale(params.locale);
	return {
		locale,
		info: localeInfo(locale)
	};
}
function meta({ params }) {
	return pageMeta(params, "/formats", (locale) => m.formats_title({}, { locale }), (locale) => m.formats_description({}, { locale }));
}
var formats_default = UNSAFE_withComponentProps(function Formats({ loaderData: { locale, info } }) {
	const o = { locale };
	const dir = getTextDirection(locale);
	const list = new Intl.ListFormat(locale, { type: "conjunction" });
	const calendarName = new Intl.DisplayNames([locale], { type: "calendar" });
	const Row = ({ sample, label, children }) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: label }), /* @__PURE__ */ jsx("dd", {
		"data-sample": sample,
		children
	})] });
	return /* @__PURE__ */ jsx(Shell, {
		locale,
		path: "/formats",
		children: /* @__PURE__ */ jsxs("section", {
			className: "page formats",
			children: [
				/* @__PURE__ */ jsxs("a", {
					className: "back-link",
					href: `/${locale}`,
					children: [/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: "back-arrow"
					}), m.home_link({}, o)]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: m.formats_label({}, o)
				}),
				/* @__PURE__ */ jsx("h1", { children: m.formats_title({}, o) }),
				/* @__PURE__ */ jsx("p", {
					className: "intro",
					children: m.formats_intro({}, o)
				}),
				/* @__PURE__ */ jsx("h2", { children: m.language_label({}, o) }),
				/* @__PURE__ */ jsxs("dl", { children: [
					/* @__PURE__ */ jsx(Row, {
						sample: "tag",
						label: m.language_tag({}, o),
						children: /* @__PURE__ */ jsx("code", { children: locale })
					}),
					/* @__PURE__ */ jsx(Row, {
						sample: "name",
						label: m.language_name({}, o),
						children: localeName(locale)
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: m.direction_label({}, o) }), /* @__PURE__ */ jsx("dd", {
						"data-sample": "direction",
						"data-direction": dir,
						children: dir === "rtl" ? m.direction_rtl({}, o) : m.direction_ltr({}, o)
					})] }),
					/* @__PURE__ */ jsx(Row, {
						sample: "languages",
						label: m.languages_available({}, o),
						children: list.format(locales.map((value) => localeName(value)))
					})
				] }),
				/* @__PURE__ */ jsx("h2", { children: m.systems_heading({}, o) }),
				/* @__PURE__ */ jsxs("dl", { children: [
					/* @__PURE__ */ jsx(Row, {
						sample: "calendar",
						label: m.calendar_label({}, o),
						children: calendarName.of(info.calendar)
					}),
					/* @__PURE__ */ jsxs(Row, {
						sample: "numbering",
						label: m.numbering_label({}, o),
						children: [
							/* @__PURE__ */ jsx("code", { children: info.numberingSystem }),
							" · ",
							new Intl.NumberFormat(locale, { numberingSystem: info.numberingSystem }).format(samples.decimal)
						]
					}),
					/* @__PURE__ */ jsx(Row, {
						sample: "hour-cycle",
						label: m.hour_cycle_label({}, o),
						children: ["h11", "h12"].includes(info.hourCycle) ? m.hour_cycle_12({}, o) : m.hour_cycle_24({}, o)
					}),
					info.firstDay && /* @__PURE__ */ jsx(Row, {
						sample: "week-start",
						label: m.week_start_label({}, o),
						children: weekdayName(locale, info.firstDay)
					})
				] }),
				/* @__PURE__ */ jsx("h2", { children: m.dates_heading({}, o) }),
				/* @__PURE__ */ jsxs("dl", { children: [
					/* @__PURE__ */ jsx(Row, {
						sample: "instant",
						label: m.instant_label({}, o),
						children: /* @__PURE__ */ jsx("time", {
							dateTime: samples.instant.toISOString(),
							children: m.instant_value({ instant: samples.instant }, o)
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						sample: "date",
						label: m.plain_date_label({}, o),
						children: /* @__PURE__ */ jsx("time", {
							dateTime: samples.date.toISOString().slice(0, 10),
							children: m.plain_date_value({ date: samples.date }, o)
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						sample: "relative",
						label: m.relative_label({}, o),
						children: m.relative_value({ days: samples.days }, o)
					}),
					/* @__PURE__ */ jsx(Row, {
						sample: "local-row",
						label: m.local_time_label({}, o),
						children: /* @__PURE__ */ jsx(DeviceTime, {
							locale,
							instant: samples.instant,
							"data-sample": "local"
						})
					})
				] }),
				/* @__PURE__ */ jsx("h2", { children: m.numbers_heading({}, o) }),
				/* @__PURE__ */ jsxs("dl", { children: [
					/* @__PURE__ */ jsx(Row, {
						sample: "decimal",
						label: m.decimal_label({}, o),
						children: m.decimal_value({ value: samples.decimal }, o)
					}),
					/* @__PURE__ */ jsx(Row, {
						sample: "percent",
						label: m.percent_label({}, o),
						children: m.percent_value({ value: samples.share }, o)
					}),
					/* @__PURE__ */ jsx(Row, {
						sample: "compact",
						label: m.compact_label({}, o),
						children: m.compact_value({ value: samples.big }, o)
					})
				] }),
				/* @__PURE__ */ jsx("h2", { children: m.currency_heading({}, o) }),
				/* @__PURE__ */ jsx("dl", { children: /* @__PURE__ */ jsx(Row, {
					sample: "currency",
					label: m.currency_label({}, o),
					children: m.currency_value({ amount: samples.amount }, o)
				}) }),
				/* @__PURE__ */ jsx("h2", { children: m.plural_heading({}, o) }),
				/* @__PURE__ */ jsx("ul", {
					className: "pills",
					children: samples.counts.map((count) => /* @__PURE__ */ jsx("li", {
						"data-count": count,
						children: m.apps_count({ count }, o)
					}, count))
				}),
				/* @__PURE__ */ jsx("h2", { children: m.ordinal_heading({}, o) }),
				/* @__PURE__ */ jsx("ul", {
					className: "pills",
					children: samples.positions.map((n) => /* @__PURE__ */ jsx("li", {
						"data-position": n,
						children: m.position_value({ n }, o)
					}, n))
				})
			]
		})
	});
});
//#endregion
//#region app/routes/robots.ts
var robots_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$1 });
function loader$1() {
	return new Response(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
//#endregion
//#region app/paths.ts
/** Public paths that exist in every locale; '' is the home page. Routes, the sitemap and the chooser derive from this list. */
var publicPaths = [
	"",
	"/demo",
	"/formats"
];
//#endregion
//#region app/routes/sitemap.ts
var sitemap_exports = /* @__PURE__ */ __exportAll({ loader: () => loader });
function loader() {
	const entries = locales.flatMap((locale) => publicPaths.map((path) => {
		const links = alternates(origin, path, locale);
		const xhtml = links.alternates.map((link) => `<xhtml:link rel="alternate" hreflang="${link.hrefLang}" href="${link.href}"/>`).join("");
		return `<url><loc>${links.canonical}</loc>${xhtml}</url>`;
	}));
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
//#endregion
//#region app/routes/not-found.tsx
var not_found_exports = /* @__PURE__ */ __exportAll({
	clientLoader: () => clientLoader,
	default: () => not_found_default
});
function clientLoader() {
	throw new Response("Not found", { status: 404 });
}
var not_found_default = UNSAFE_withComponentProps(function NotFound() {
	return null;
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-Dz5aa0DZ.js",
		"imports": [
			"/assets/components-TmgkSkkA.js",
			"/assets/errorBoundaries-GqZz629Q.js",
			"/assets/jsx-runtime-CNjUVJGA.js"
		],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-CyiQB2Jc.js",
			"imports": [
				"/assets/components-TmgkSkkA.js",
				"/assets/errorBoundaries-GqZz629Q.js",
				"/assets/jsx-runtime-CNjUVJGA.js",
				"/assets/lib-Clc8njzi.js",
				"/assets/messages-BGOZQd92.js"
			],
			"css": ["/assets/root-BOMO9DTa.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/choose": {
			"id": "routes/choose",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/choose-uzsgQxyk.js",
			"imports": [
				"/assets/components-TmgkSkkA.js",
				"/assets/jsx-runtime-CNjUVJGA.js",
				"/assets/entry-C9KW5_s7.js",
				"/assets/messages-BGOZQd92.js",
				"/assets/origin-DvU0Wyh1.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"choose/demo": {
			"id": "choose/demo",
			"parentId": "root",
			"path": "demo",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/unprefixed-CJTD586s.js",
			"imports": [
				"/assets/components-TmgkSkkA.js",
				"/assets/jsx-runtime-CNjUVJGA.js",
				"/assets/entry-C9KW5_s7.js",
				"/assets/messages-BGOZQd92.js",
				"/assets/origin-DvU0Wyh1.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"choose/formats": {
			"id": "choose/formats",
			"parentId": "root",
			"path": "formats",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/unprefixed-CJTD586s.js",
			"imports": [
				"/assets/components-TmgkSkkA.js",
				"/assets/jsx-runtime-CNjUVJGA.js",
				"/assets/entry-C9KW5_s7.js",
				"/assets/messages-BGOZQd92.js",
				"/assets/origin-DvU0Wyh1.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": ":locale",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-BWeJqpZ4.js",
			"imports": [
				"/assets/components-TmgkSkkA.js",
				"/assets/jsx-runtime-CNjUVJGA.js",
				"/assets/messages-BGOZQd92.js",
				"/assets/button-D_JqTtMu.js",
				"/assets/seo-_IT42sZV.js",
				"/assets/lib-Clc8njzi.js",
				"/assets/origin-DvU0Wyh1.js",
				"/assets/errorBoundaries-GqZz629Q.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/demo": {
			"id": "routes/demo",
			"parentId": "root",
			"path": ":locale/demo",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/demo-BIMkAGfD.js",
			"imports": [
				"/assets/components-TmgkSkkA.js",
				"/assets/jsx-runtime-CNjUVJGA.js",
				"/assets/messages-BGOZQd92.js",
				"/assets/button-D_JqTtMu.js",
				"/assets/seo-_IT42sZV.js",
				"/assets/lib-Clc8njzi.js",
				"/assets/origin-DvU0Wyh1.js",
				"/assets/errorBoundaries-GqZz629Q.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/formats": {
			"id": "routes/formats",
			"parentId": "root",
			"path": ":locale/formats",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/formats-Dju_euP4.js",
			"imports": [
				"/assets/components-TmgkSkkA.js",
				"/assets/jsx-runtime-CNjUVJGA.js",
				"/assets/messages-BGOZQd92.js",
				"/assets/seo-_IT42sZV.js",
				"/assets/lib-Clc8njzi.js",
				"/assets/origin-DvU0Wyh1.js",
				"/assets/errorBoundaries-GqZz629Q.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/robots": {
			"id": "routes/robots",
			"parentId": "root",
			"path": "robots.txt",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/robots-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/sitemap": {
			"id": "routes/sitemap",
			"parentId": "root",
			"path": "sitemap.xml",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/sitemap-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/not-found": {
			"id": "routes/not-found",
			"parentId": "root",
			"path": "*",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": true,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/not-found-main-Bz9SZdSi.js",
			"imports": ["/assets/components-TmgkSkkA.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": "/assets/not-found-client-loader-DdSMU0SX.js",
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-a870d9cb.js",
	"version": "a870d9cb",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = false;
var isSpaMode = false;
var prerender = [
	"/",
	"/demo",
	"/formats",
	"/en",
	"/en/demo",
	"/en/formats",
	"/es",
	"/es/demo",
	"/es/formats",
	"/ar",
	"/ar/demo",
	"/ar/formats",
	"/robots.txt",
	"/sitemap.xml"
];
var routeDiscovery = { "mode": "initial" };
var publicPath = "/";
var entry = { module: entry_server_web_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/choose": {
		id: "routes/choose",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: choose_exports
	},
	"choose/demo": {
		id: "choose/demo",
		parentId: "root",
		path: "demo",
		index: void 0,
		caseSensitive: void 0,
		module: unprefixed_exports
	},
	"choose/formats": {
		id: "choose/formats",
		parentId: "root",
		path: "formats",
		index: void 0,
		caseSensitive: void 0,
		module: unprefixed_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: ":locale",
		index: void 0,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/demo": {
		id: "routes/demo",
		parentId: "root",
		path: ":locale/demo",
		index: void 0,
		caseSensitive: void 0,
		module: demo_exports
	},
	"routes/formats": {
		id: "routes/formats",
		parentId: "root",
		path: ":locale/formats",
		index: void 0,
		caseSensitive: void 0,
		module: formats_exports
	},
	"routes/robots": {
		id: "routes/robots",
		parentId: "root",
		path: "robots.txt",
		index: void 0,
		caseSensitive: void 0,
		module: robots_exports
	},
	"routes/sitemap": {
		id: "routes/sitemap",
		parentId: "root",
		path: "sitemap.xml",
		index: void 0,
		caseSensitive: void 0,
		module: sitemap_exports
	},
	"routes/not-found": {
		id: "routes/not-found",
		parentId: "root",
		path: "*",
		index: void 0,
		caseSensitive: void 0,
		module: not_found_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
