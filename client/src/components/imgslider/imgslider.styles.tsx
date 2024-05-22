import tw from "tailwind-styled-components"


interface DotActiveProps {
    $active: boolean
}

export const ImgContainer = tw.div`relative w-full h-full flex items-center justify-center overflow-hidden rounded-l-2xl`;
export const Img = tw.img`w-full h-full object-cover`

export const ImgButton = tw.button`absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-white px-1 py-2 rounded-2xl`;
export const BtnSvg = tw.img``;

export const ImgSlide = tw.div`w-full h-full bg-cover bg-center transition-transform duration-500`;
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-3xl font-bold`

export const DotsContainer = tw.div`absolute bottom-4 w-full flex justify-center gap-2`;

export const Dot = tw.div<DotActiveProps>`w-1 h-1 rounded-full cursor-pointer ${p => (p.$active ? "bg-main" : "bg-white")}`;