/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                main: "#6666ff",
                tomain: "#9999ff",
                kakao: "#FAE100",
                "kakao-text": "#371D1E"
            },
            screens: {
                mobile: { max: "640px" },
                tablet: { min: "641px", max: "1024px" },
            },
            keyframes: {
                modal: {
                    from: { transform: "translate(-50%, -50%) translateY(-100%)" },
                    to: { transform: "translate(-50%, -50%) translateY(0)" },
                },
            },
            animation: {
                modal: "modal 0.5s ease-in-out 1",
            },
            zIndex: {
                100: "100",
            },
            fontFamily: {
                sans: ['"Noto Sans KR"', "sans-serif"],
            },
            minHeight: {
                "screen-16": "calc(100vh - 4.1rem)",
            },
            backgroundImage: {
                "main-img": "url('/src/assets/main.jpg')",
                "main-img-mobile": "url('/src/assets/main_mobile.png')",
            }
        },
    },
    plugins: [],
};
