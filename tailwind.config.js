/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontSize: {
                
            },
            colors: {
                "blue": {
                    50: "#DEEDF7",
                    100: "#B9D9EE",
                    200: "#78B5DE",
                    300: "#328FCD",
                    400: "#22618B",
                    500: "#113045",
                    600: "#0E2839",
                    700: "#0A1D29",
                    800: "#07141D",
                    900: "#03090C",
                    950: "#020608"
                }
            }
        },
    },
    plugins: [],
}
