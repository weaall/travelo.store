import tw from "tailwind-styled-components";

export const Container = tw.div`w-full`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2 px-6 py-6 border-b`
export const ContentsFlex = tw.div`w-full flex items-center justify-between`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`

export const Title = tw.h3`w-[50%] py-6 text-2xl font-bold`

export const AddBtn = tw.button`p-2 font-bold hover:text-main`

export const RoomList = tw.div`space-y-2`
export const RoomWrap = tw.div`py-3 px-4 bg-gray-50 rounded-xl`
export const RoomName = tw.h2`font-bold text-lg`
export const RoomText = tw.p``

