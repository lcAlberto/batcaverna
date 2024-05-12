/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                'my-theme': {
                    "primary": "#8900ff",
                    "primary-content": "#e4d9ff",
                    "secondary": "#00ceff",
                    "secondary-content": "#000f16",
                    "accent": "#00efd9",
                    "accent-content": "#001411",
                    "neutral": "#21253a",
                    "neutral-content": "#cdcfd4",
                    "base-100": "#292743",
                    "base-200": "#222039",
                    "base-300": "#1c1a2f",
                    "base-content": "#cfcfd7",
                    "info": "#13d1ff",
                    "info-content": "#001016",
                    "success": "#00a220",
                    "success-content": "#000a00",
                    "warning": "#da8500",
                    "warning-content": "#110600",
                    "error": "#ff7384",
                    "error-content": "#160506",
                },
            },
            "light",
            // "dark",
            // "cupcake",
            // "bumblebee"
        ]
    }
}

