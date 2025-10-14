const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                "text-primary": "var(--text-main)",
                "text-secondary": "var(--text-main)",
                "base-100": "var(--bg-main)",
                "base-200": "var(--bg-muted)",
                "base-300": "var(--border-main)",
                accent: "var(--text-main)",
            },
            fontFamily: {
                sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
                serif: ['"Merriweather"', ...defaultTheme.fontFamily.serif],
                mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [],
}; 