/** @type {import('tailwindcss').Config} */

module.exports = {
    purge: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    mode: "jit",
    theme: {
        colors: {
            "yellow-l": "#feffdf",
            "yellow-d": "#dde0ab",
            "beige-l": "#f0ece2",
            "beige-d": "#d1cebd",
            "sage-l": "#a7bcb9",
            "sage-d": "#7fa99b",
            black: "#000",
            white: "#FFF",
        },
        backgroundImage: (theme) => ({
            "yellow-gradient":
                "linear-gradient(180deg, #feffdf 0%, #dde0ab 100%)",
            "beige-gradient":
                "linear-gradient(180deg, #f0ece2 0%, #d1cebd 100%)",
            "sage-gradient":
                "linear-gradient(180deg, #7fa99b 0%, #a7bcb9 100%)",
            "white-gradient": "linear-gradient(180deg,  #f0ece2 0%, #FFF 100%)",
        }),
        fontFamily: {
            karla: ["var(--font-karla)", "sans-serif"],
            comfortaa: ["var(--font-comfortaa)", "sans-serif"],
        },
        extended: {},
    },
    screens: {
        xs: "480px",
        sm: "768px",
        md: "1024px",
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
