declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
};
"smarttax": {
"about-smarttax.md": {
	id: "about-smarttax.md";
  slug: "about-smarttax";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"legal-history.md": {
	id: "legal-history.md";
  slug: "legal-history";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/alabama.md": {
	id: "state-tax-information/alabama.md";
  slug: "state-tax-information/alabama";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/alaska.md": {
	id: "state-tax-information/alaska.md";
  slug: "state-tax-information/alaska";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/arizona.md": {
	id: "state-tax-information/arizona.md";
  slug: "state-tax-information/arizona";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/arkansas.md": {
	id: "state-tax-information/arkansas.md";
  slug: "state-tax-information/arkansas";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/california.md": {
	id: "state-tax-information/california.md";
  slug: "state-tax-information/california";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/colorado.md": {
	id: "state-tax-information/colorado.md";
  slug: "state-tax-information/colorado";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/connecticut.md": {
	id: "state-tax-information/connecticut.md";
  slug: "state-tax-information/connecticut";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/delaware.md": {
	id: "state-tax-information/delaware.md";
  slug: "state-tax-information/delaware";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/district-of-columbia.md": {
	id: "state-tax-information/district-of-columbia.md";
  slug: "state-tax-information/district-of-columbia";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/florida.md": {
	id: "state-tax-information/florida.md";
  slug: "state-tax-information/florida";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/georgia.md": {
	id: "state-tax-information/georgia.md";
  slug: "state-tax-information/georgia";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/guam.md": {
	id: "state-tax-information/guam.md";
  slug: "state-tax-information/guam";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/hawaii.md": {
	id: "state-tax-information/hawaii.md";
  slug: "state-tax-information/hawaii";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/idaho.md": {
	id: "state-tax-information/idaho.md";
  slug: "state-tax-information/idaho";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/illinois.md": {
	id: "state-tax-information/illinois.md";
  slug: "state-tax-information/illinois";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/indiana.md": {
	id: "state-tax-information/indiana.md";
  slug: "state-tax-information/indiana";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/iowa.md": {
	id: "state-tax-information/iowa.md";
  slug: "state-tax-information/iowa";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/kansas.md": {
	id: "state-tax-information/kansas.md";
  slug: "state-tax-information/kansas";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/kentucky.md": {
	id: "state-tax-information/kentucky.md";
  slug: "state-tax-information/kentucky";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/louisiana.md": {
	id: "state-tax-information/louisiana.md";
  slug: "state-tax-information/louisiana";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/maine.md": {
	id: "state-tax-information/maine.md";
  slug: "state-tax-information/maine";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/maryland.md": {
	id: "state-tax-information/maryland.md";
  slug: "state-tax-information/maryland";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/massachusetts.md": {
	id: "state-tax-information/massachusetts.md";
  slug: "state-tax-information/massachusetts";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/michigan.md": {
	id: "state-tax-information/michigan.md";
  slug: "state-tax-information/michigan";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/minnesota.md": {
	id: "state-tax-information/minnesota.md";
  slug: "state-tax-information/minnesota";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/mississippi.md": {
	id: "state-tax-information/mississippi.md";
  slug: "state-tax-information/mississippi";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/missouri.md": {
	id: "state-tax-information/missouri.md";
  slug: "state-tax-information/missouri";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/montana.md": {
	id: "state-tax-information/montana.md";
  slug: "state-tax-information/montana";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/nebraska.md": {
	id: "state-tax-information/nebraska.md";
  slug: "state-tax-information/nebraska";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/nevada.md": {
	id: "state-tax-information/nevada.md";
  slug: "state-tax-information/nevada";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/new-hampshire.md": {
	id: "state-tax-information/new-hampshire.md";
  slug: "state-tax-information/new-hampshire";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/new-jersey.md": {
	id: "state-tax-information/new-jersey.md";
  slug: "state-tax-information/new-jersey";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/new-mexico.md": {
	id: "state-tax-information/new-mexico.md";
  slug: "state-tax-information/new-mexico";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/new-york.md": {
	id: "state-tax-information/new-york.md";
  slug: "state-tax-information/new-york";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/north-carolina.md": {
	id: "state-tax-information/north-carolina.md";
  slug: "state-tax-information/north-carolina";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/north-dakota.md": {
	id: "state-tax-information/north-dakota.md";
  slug: "state-tax-information/north-dakota";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/northern-mariana-islands.md": {
	id: "state-tax-information/northern-mariana-islands.md";
  slug: "state-tax-information/northern-mariana-islands";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/ohio.md": {
	id: "state-tax-information/ohio.md";
  slug: "state-tax-information/ohio";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/oklahoma.md": {
	id: "state-tax-information/oklahoma.md";
  slug: "state-tax-information/oklahoma";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/oregon.md": {
	id: "state-tax-information/oregon.md";
  slug: "state-tax-information/oregon";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/pennsylvania.md": {
	id: "state-tax-information/pennsylvania.md";
  slug: "state-tax-information/pennsylvania";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/puerto-rico.md": {
	id: "state-tax-information/puerto-rico.md";
  slug: "state-tax-information/puerto-rico";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/south-carolina.md": {
	id: "state-tax-information/south-carolina.md";
  slug: "state-tax-information/south-carolina";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/south-dakota.md": {
	id: "state-tax-information/south-dakota.md";
  slug: "state-tax-information/south-dakota";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/tennessee.md": {
	id: "state-tax-information/tennessee.md";
  slug: "state-tax-information/tennessee";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/texas.md": {
	id: "state-tax-information/texas.md";
  slug: "state-tax-information/texas";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/utah.md": {
	id: "state-tax-information/utah.md";
  slug: "state-tax-information/utah";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/vermont.md": {
	id: "state-tax-information/vermont.md";
  slug: "state-tax-information/vermont";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/virgin-islands.md": {
	id: "state-tax-information/virgin-islands.md";
  slug: "state-tax-information/virgin-islands";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/virginia.md": {
	id: "state-tax-information/virginia.md";
  slug: "state-tax-information/virginia";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/washington.md": {
	id: "state-tax-information/washington.md";
  slug: "state-tax-information/washington";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/west-virginia.md": {
	id: "state-tax-information/west-virginia.md";
  slug: "state-tax-information/west-virginia";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/wisconsin.md": {
	id: "state-tax-information/wisconsin.md";
  slug: "state-tax-information/wisconsin";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"state-tax-information/wyoming.md": {
	id: "state-tax-information/wyoming.md";
  slug: "state-tax-information/wyoming";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
"surcharges.md": {
	id: "surcharges.md";
  slug: "surcharges";
  body: string;
  collection: "smarttax";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"faq": {
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
