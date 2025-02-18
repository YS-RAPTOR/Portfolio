/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            screens: {
                xs: "400px",
            },
            fontSize: {
                "2xs": ["0.625rem", "0.75rem"],
            },
        },
    },
    plugins: [],
};
