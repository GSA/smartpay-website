import { z, defineCollection } from 'astro:content';
import { glob } from "astro/loaders";

const nav = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/nav" })
})


// Define types for content collections
const faqCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string()
  }),
});

const helpfulHints = defineCollection({})
const about = defineCollection({})
const contact = defineCollection({})
const audits = defineCollection({})
const merchants = defineCollection({})
const smartBulletins = defineCollection({})
const howItWorks = defineCollection({})
const guidanceAndAudits = defineCollection({})
const resources = defineCollection({})
const smartTax = defineCollection({})
const stakeholders = defineCollection({})
const stateTaxes = defineCollection({})
const travelPublications = defineCollection({})
const publications = defineCollection({})
const forumPresentations2023 = defineCollection({})
const allBusinessLinesPublications = defineCollection({})
const fleetPublications = defineCollection({})
const purchasePublications = defineCollection({})

export const collections = {
  'faq': faqCollection,
  forumPresentations2023,
  nav,
  helpfulHints,
  about,
  contact,
  audits,
  merchants,
  smartBulletins,
  howItWorks,
  guidanceAndAudits,
  resources,
  smartTax,
  stakeholders,
  stateTaxes,
  travelPublications,
  publications,
  allBusinessLinesPublications,
  fleetPublications,
  purchasePublications
};
