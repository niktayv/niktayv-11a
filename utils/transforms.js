const htmlmin = require('html-minifier-terser');

module.exports = {
  htmlmin: async function (content, outputPath) {
    // bail if not production env
    if (process.env.ELEVENTY_ENV !== 'production') {
      return content;
    }

    // returned minified content from html files
    if (outputPath.endsWith('.html')) {
      let minified = await htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    return content;
  },
};
