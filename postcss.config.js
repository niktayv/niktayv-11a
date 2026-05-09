module.exports = {
  // Tailwind v4's PostCSS plugin handles @import processing and uses
  // Lightning CSS for vendor prefixing plus production optimization/minification.
  plugins: [require('@tailwindcss/postcss')],
};
