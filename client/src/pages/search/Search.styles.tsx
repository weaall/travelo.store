import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center pb-4`

export const MainContainer = tw.div`w-full bg-gray-200 py-20`

export const SearchContainer = tw.div`h-24 bg-white shadow-md flex rounded-2xl px-6 py-6`

export const SearchWrap = tw.div`w-5/12 h-full flex items-center justify-between p-1`
export const SearchInput = tw.input`text-sm px-2 flex-1 font-bold outline-none`

export const CalendarWrap = tw.div`w-3/12 h-full border-gray-300 flex items-center p-1`
export const CalendarBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2`

export const PersonWrap = tw.div`w-3/12 h-full flex items-center p-1`
export const PersonBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2`

export const SvgWrap = tw.div`ml-4 w-6`
export const Svg = tw.img`w-6`

export const RemoveBtn = tw.button`mr-4 w-6`

export const SearchBtn = tw.button`w-1/12 h-full rounded-md bg-black flex items-center justify-center`

