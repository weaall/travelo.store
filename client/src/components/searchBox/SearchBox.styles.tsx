import tw from "tailwind-styled-components"

export const Container = tw.div`w-full flex flex-col items-center py-4 mobile:pt-0`

export const MainContainer = tw.div`w-full`

export const SearchContainer = tw.div`rounded-md h-24 bg-white shadow-md border
mobile:rounded-b`

export const UpperWrap = tw.div`flex h-12 items-center border-b border-gray-300`
export const BottomWrap = tw.div`flex h-12 items-center`

export const SearchWrap = tw.div`w-full h-full flex items-center justify-between p-1`
export const SearchInput = tw.input`text-sm px-2 flex-1 font-bold outline-none mobile:-mr-12`

export const CalendarWrap = tw.div`w-1/2 h-full border-r border-gray-300 flex items-center p-1`
export const CalendarBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2`

export const PersonWrap = tw.div`w-1/2 h-full flex items-center p-1`
export const PersonBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2`

export const SvgWrap = tw.div`ml-4 min-w-6`
export const Svg = tw.img`w-6`

export const RemoveBtn = tw.button`mr-2 min-w-6`

export const SearchBtn = tw.button`min-w-20 rounded-md bg-black h-full flex items-center justify-center`

