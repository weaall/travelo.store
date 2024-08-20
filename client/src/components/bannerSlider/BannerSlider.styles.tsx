import tw from "tailwind-styled-components"

export const Container = tw.div`rounded-xl border flex flex-col items-center`

export const ImgContainer = tw.div`relative w-full h-[200px] flex items-center justify-center overflow-hidden`;
export const Img = tw.img`w-full h-full object-cover`

export const ImgButton = tw.button`absolute top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-40 text-white w-10 h-10 text-xl rounded-2xl px-2`;

export const UnRegWrap = tw.div`flex h-full justify-center items-center text-3xl font-bold`

export const Svg = tw.img`w-full h-full `


export const IndexWrap = tw.div`flex`
export const Index = tw.p`text-xs p-3`