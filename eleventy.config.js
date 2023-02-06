const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const yaml = require("js-yaml");
const { parse } = require('csv-parse/sync');
const charts = require('eleventy-charts');

module.exports = function(eleventyConfig) {
  const pathPrefix = process.env.BASEURL || "/";

  // Copy assets directory
  eleventyConfig.addPassthroughCopy("assets");

  // Add 11ty plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
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

  // Add a comment shortcode
  // eleventyConfig.addPairedShortcode("comment", () => {});

  return {
    pathPrefix,
  };
};
