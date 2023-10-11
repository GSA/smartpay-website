# GSA SmartPay® Website

This is the website for the GSA SmartPay program. 

It is a statically-generated site built using [Astro](https://astro.build) to run on [cloud.gov pages](https://pages.cloud.gov).


## 🚀 Project Structure

Inside of the project, you'll see the following folders and files:

```
/
├── sass/              /* USWDS sass components */
├── public/            /* Static, unprocessed assets (css, js, …) */
├── src/
│   └── assets/        /* Sssets like images used in code */
│   └── config/        /* Extra js processing */
│   └── content/       /* Primary markdown content */
│   └── components/    /* Eeusable Astro components */
│   └── layouts/       /* Large astro components for pages */
│   └── pages/         /* This directorty maps to the urls of the site
│       └── about/
    │   └── ...
│   └── plugins/       /* Custom processing of markdown */ 
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/` or `src/layouts` but that's where we like to put any Astro components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🇺🇸 USWDS
This site uses the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov). To customize  USWDS styles you will need to edit the SASS components and styles in the `/sass` directory. Changes here will not be reflected in the site until you rebuild the css. To build the css, run gulp:

```
npx gulp compile --gulpfile gulpfile.cjs
```
This will rebuild the static assests and place them in the `/public` directory. To learn more, visit USWDS [Getting started for developers  ](https://designsystem.digital.gov/documentation/getting-started-for-developers/).


## ☁️ Deploying to Cloud.gov Pages
[Cloud.gov Pages](https://pages.cloud.gov/) manages the deployment of this site by watching for changes to the github repository. Changes to the `main` branch will be deployed to production. Changes to staging will be deployed to the demo site. For other branches Cloud.gov pages will create a preview specific to that branch. See [Pages Documentation](https://cloud.gov/pages/documentation/) for specific information.
## 👀 Want to learn more?

[Astro documentation](https://docs.astro.build). Astro also maintains a helpful [Discord server](https://astro.build/chat).
