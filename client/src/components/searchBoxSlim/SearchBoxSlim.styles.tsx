import tw from "tailwind-styled-components"

export const Container = tw.div`w-full flex flex-col items-center py-4 sticky top-0 z-50 max-w-[840px]`

export const MainContainer = tw.div`w-full`

export const SearchContainer = tw.div`flex rounded-md h-14 bg-white shadow-md border p-1 mx-6`

export const SearchWrap = tw.div`w-5/12 h-full flex items-center justify-between py-1 border-r`
export const SearchInput = tw.input`text-sm px-2 flex-1 font-bold outline-none`

export const CalendarWrap = tw.div`w-3/12 h-full border-r border-gray-300 flex items-center py-1`
export const CalendarBtn = tw.button`flex text-sm items-center flex-1 font-bold text-left gap-2`

export const PersonWrap = tw.div`w-3/12 h-full border-r border-gray-300 flex items-center py-1`
export const PersonBtn = tw.button`flex text-sm items-center flex-1 font-bold text-left gap-2`

export const SvgWrap = tw.div`ml-4 w-6`
export const Svg = tw.img`w-6`

export const RemoveBtn = tw.button`mr-2 w-6`

export const SearchBtn = tw.button`h-full w-1/12 rounded-md bg-black flex items-center justify-center`

