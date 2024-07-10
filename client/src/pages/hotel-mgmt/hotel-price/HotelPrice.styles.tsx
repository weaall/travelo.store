import tw from "tailwind-styled-components";

interface DayProps {
    $day: number
}

export const Container = tw.div`w-full h-full flex flex-col items-center`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2 px-6 py-6 border-b`
export const ContentsFlex = tw.div`w-full flex items-center justify-between`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`

export const Title = tw.h3`w-[50%] py-6 text-2xl font-bold`

export const AddBtn = tw.button`p-2 font-bold hover:text-main`

export const PriceContainer = tw.div`overflow-auto overflow-x-scroll pb-6`

export const DateContainer = tw.div`ml-60 w-auto flex`
export const DateWrap = tw.div<DayProps>`flex justify-center items-center border border-black px-2 min-w-16
${(p) => (p.$day === 0 ? "bg-red-500 text-white" : p.$day === 6 ? "bg-blue-500 text-white" : "")}`
export const DateText = tw.p`text-xs`

export const RoomTable = tw.div``
export const RoomContainer = tw.div`flex`
export const RoomWrap = tw.div`flex flex-col bg-gray-50 border border-black w-60 text-center h-20 justify-center`
export const RoomName = tw.h2`font-bold text-sm`
export const RoomText = tw.p`text-xs`

export const PriceWrap = tw.div`flex flex col min-w-16`
export const Price = tw.div`border`
export const RoomC = tw.div`border`
export const RoomL = tw.div`border`


