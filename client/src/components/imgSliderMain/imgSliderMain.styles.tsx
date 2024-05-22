import tw from "tailwind-styled-components"

export const ImgContainer = tw.div`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl 
mobile:h-60`;
export const Img = tw.img`w-full h-full object-cover`

export const ImgButton = tw.button`absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-40 text-white w-10 h-10 text-xl rounded-2xl`;

export const ImgWrapper = tw.div`flex transition-transform duration-500`;

export const UnRegWrap = tw.div`flex h-full justify-center items-center text-3xl font-bold`

export const IndexWrap = tw.div`absolute bottom-4 right-4 bg-black text-white text-xs px-2 py-1 rounded bg-opacity-50 `