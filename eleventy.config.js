const { DateTime } = require('luxon')
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const embedEverythingPlugin = require("eleventy-plugin-embed-everything");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const yaml = require("js-yaml");
const { parse } = require('csv-parse/sync');
const charts = require('eleventy-charts');
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  const pathPrefix = process.env.BASEURL || "/";

  // Copy assets directory
  eleventyConfig.addPassthroughCopy("assets");

  // Add 11ty plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(embedEverythingPlugin);
  eleventyConfig.addPlugin(charts);

  // Add markdown-it plugins
  eleventyConfig.amendLibrary("md", md => md.use(markdownItAnchor));
  eleventyConfig.amendLibrary("md", md => md.use(markdownItAttrs));

  // Read YAML files in the _data directory
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  // Read CSV files in the _data directory
  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  });

  // Watch for changes in additional directories
  eleventyConfig.addWatchTarget("_data");

  // Make these variables available everywhere on the site
  eleventyConfig.addGlobalData("pathPrefix", pathPrefix);

  // provide for sitemap
  eleventyConfig.addPlugin(pluginRss);
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd')
  })
  // Add a comment shortcode
  // eleventyConfig.addPairedShortcode("comment", () => {});

  // Format dates
  eleventyConfig.addFilter("formatDateMedium", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    pathPrefix,
  };
};
