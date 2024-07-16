/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontSize:{
                "xxs": "0.5rem"
            },
            colors: {
                main: "#6666ff",
                tomain: "#9999ff",
                kakao: "#FAE100",
                "kakao-text": "#371D1E",
                naver: "#2DB400",
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
                "screen-32": "calc(100vh - 8.1rem)",
            },
            maxHeight: {
                "screen-16": "calc(100vh - 3.8rem)",
                "screen-32": "calc(100vh - 8.5rem)",
                "screen-36": "calc(100vh - 9rem)",
                "screen-42": "calc(100vh - 12.5rem)",
            },
            backgroundImage: {
                "main-img": "url('/src/assets/main.jpg')",
                "main-img-mobile": "url('/src/assets/main_mobile.png')",
            }
        },
    },
    plugins: [],
};
