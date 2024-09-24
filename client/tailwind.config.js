/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontSize: {
                "2xs": "0.65rem",
                "5xl": "0.65rem",
            },
            colors: {
                main: "#006CE4",
                kakao: "#FAE100",
                "kakao-text": "#371D1E",
                naver: "#2DB400",
                darkGray: "#aaaaaa",
                midGray: "#cccccc",
                lightGray: "#eeeeee",
            },
            screens: {
                mobile: { max: "640px" },
                tablet: { min: "641px", max: "1024px" },
            },
            zIndex: {
                100: "100",
                51: "51",
            },
            fontFamily: {
                sans: ['"Noto Sans KR"', "sans-serif"],
                apple: ['"Apple SD Gothic Neo"', "Noto Sans KR", "sans-serif"],
            },
            minHeight: {
                "screen-16": "calc(100vh - 4.1rem)",
                "screen-32": "calc(100vh - 8.1rem)",
            },
            maxHeight: {
                "screen-16": "calc(100vh - 3.8rem)",
                "screen-24": "calc(100vh - 3.9rem)",
                "screen-32": "calc(100vh - 8.5rem)",
                "screen-42": "calc(100vh - 12.5rem)",
            },
            backgroundImage: {
                "main-img": "url('/src/assets/main.jpg')",
                "main-img-mobile": "url('/src/assets/main_mobile.png')",
            },
            keyframes: {
                modal: {
                    from: {
                        transform: "translate(-50%, -50%) scale(0.8)",
                        opacity: 0,
                    },
                    to: {
                        transform: "translate(-50%, -50%) scale(1)",
                        opacity: 1,
                    },
                },
                closeModal: {
                    from: {
                        transform: "translate(-50%, -50%) scale(1)",
                        opacity: 1,
                    },
                    to: {
                        transform: "translate(-50%, -50%) scale(0.8)",
                        opacity: 0,
                    },
                },
                backdrop: {
                    from: {
                        opacity: 0,
                        backdropFilter: "blur(0px)",
                    },
                    to: {
                        opacity: 1,
                        backdropFilter: "blur(3px)",
                    },
                },
                closeBackdrop: {
                    from: {
                        opacity: 1,
                        backdropFilter: "blur(3px)",
                    },
                    to: {
                        opacity: 0,
                        backdropFilter: "blur(0px)",
                    },
                },
                gradient: {
                    "0%": {
                        backgroundPosition: "0% 50%",
                    },
                    "50%": {
                        backgroundPosition: "100% 50%",
                    },
                    "100%": {
                        backgroundPosition: "0% 50%",
                    },
                },
                drawer: {
                    from: {
                        transform: "translate(50%, 0)",
                        opacity: 0,
                    },
                    to: {
                        transform: "translate(0, 0)",
                        opacity: 1,
                    },
                },
                closeDrawer: {
                    from: {
                        transform: "translate(0, 0)",
                        opacity: 0,
                    },
                    to: {
                        transform: "translate(50%, 0)",
                        opacity: 1,
                    },
                },
            },
            animation: {
                modal: "modal 0.5s ease-out forwards",
                closeModal: "closeModal 0.5s ease-out forwards",
                backdrop: "backdrop 0.5s ease-out forwards",
                closeBackdrop: "closeBackdrop 0.5s ease-out forwards",
                gradient: "gradient 1s ease infinite alternate",
                drawer: "drawer 0.5s ease-out forwards",
                closeDrawer: "closeDrawer 0.5s ease-out forwards",
            },
            backgroundSize: {
                "300%": "300%",
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".text-shadow-custom": {
                    "text-shadow": "-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white",
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
