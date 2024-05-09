import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center py-10`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2 px-6 py-6 border-b`
export const ContentsFlex = tw.div`w-auto flex items-center`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`

export const MainContainer = tw.div`w-full`

export const SearchContainer = tw.div`mx-10 rounded-md h-24 bg-white shadow-md border`

export const UpperWrap = tw.div`flex h-12 items-center border-b border-gray-300`
export const BottomWrap = tw.div`flex h-12 items-center`

export const SearchWrap = tw.div`w-full h-full flex items-center space-x-4 justify-between`
export const SearchInput = tw.input`text-me flex-1 font-bold outline-none`

export const CalendarWrap = tw.div`w-1/2 h-full border-r border-gray-300 flex items-center`
export const PersonWrap = tw.div`w-1/2 h-full flex items-center`

export const SvgWrap = tw.div`pl-4 w-10`
export const Svg = tw.img``

export const CloseBtn = tw.button`pr-4 w-10`
export const CloseSvg = tw.img``