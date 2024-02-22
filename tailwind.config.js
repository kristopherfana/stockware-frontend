
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    './src/**/*.{html,ts}',
    './src/app/shared/spartan/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
