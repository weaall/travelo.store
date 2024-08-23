import tw from "tailwind-styled-components"

export const Container = tw.div`relative flex flex-col items-center overflow-hidden w-full px-5`

export const ImgContainer = tw.div`relative w-full flex items-center justify-center overflow-hidden group`;
export const ImgListWrap = tw.div`flex transition-transform duration-500 ease-in-out`
export const ImgWrap = tw.div`w-[50%] px-1 h-[140px] flex-shrink-0 mobile:w-[100%] cursor-pointer`
export const ImgButton = tw.button`absolute top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-40 hidden
text-white w-10 h-10 text-xl rounded-full p-2 z-10 hover:bg-opacity-60
group-hover:block mobile:group-hover:hidden `;

export const UnRegWrap = tw.div`flex h-full justify-center items-center text-3xl font-bold`

export const Svg = tw.img`w-full h-full `

export const IndexWrap = tw.div`flex justify-center items-center`
export const ToggleBtn = tw.button`w-4 mx-3`
export const Index = tw.div`flex text-5xl font-medium my-3 px-3 border-l border-gray-300`
export const IndexSpan = tw.span`pl-1 text-gray-500`