import { renderToString } from "react-dom/server";
import { Button } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { jsx, jsxs } from "react/jsx-runtime";
import { m } from "@joeblew999/remy-ui/messages";
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
//#region node_modules/@joeblew999/remy-ui/src/paraglide/runtime.js
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
/** @type {any} */ globalThis.__paraglide = globalThis.__paraglide ?? {};
/** @type {any} */ globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {};
var cookieNamePattern = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
new RegExp(`(?:^|;\\s*)${cookieNamePattern}=([^;]*)`);
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
var rtlScripts = /* @__PURE__ */ new Set([
	"Arab",
	"Hebr",
	"Syrc",
	"Thaa",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Mand",
	"Samr"
]);
/** Document direction for a locale; identical on the server and in every browser. */
function direction(locale) {
	return rtlScripts.has(new Intl.Locale(locale).maximize().script ?? "") ? "rtl" : "ltr";
}
/** The locale's name in its own language (its endonym), from the runtime's CLDR data. */
function localeName(locale, inLocale = locale) {
	return new Intl.DisplayNames([inLocale], { type: "language" }).of(locale) ?? locale;
}
//#endregion
//#region src/app.tsx
function App() {
	return /* @__PURE__ */ jsx("main", { children: locales.map((locale) => /* @__PURE__ */ jsxs("section", {
		lang: locale,
		dir: direction(locale),
		children: [
			/* @__PURE__ */ jsx("h1", { children: m.home_title({}, { locale }) }),
			/* @__PURE__ */ jsxs("p", { children: [
				localeName(locale),
				" · ",
				m.apps_count({ count: 3 }, { locale }),
				" · ",
				m.currency_value({ amount: 1234.5 }, { locale })
			] }),
			/* @__PURE__ */ jsx(Button$1, { children: m.increment({}, { locale }) })
		]
	}, locale)) });
}
//#endregion
//#region src/server.tsx
process.stdout.write(renderToString(/* @__PURE__ */ jsx(App, {})));
//#endregion
export {};
