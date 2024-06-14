import tw from "tailwind-styled-components"

export const Container = tw.div`w-full flex flex-col items-center py-4`

export const MainContainer = tw.div`w-full`

export const SearchContainer = tw.div`flex rounded-md h-14 bg-white shadow-md border p-1 mx-6`

export const SearchWrap = tw.div`w-[34%] h-full flex items-center justify-between py-1 border-r`
export const SearchInput = tw.input`w-full text-sm px-2 flex-1 font-bold outline-none`

export const CalendarWrap = tw.div`w-[29%] h-full border-r border-gray-300 flex items-center py-1`
export const CalendarBtn = tw.button`flex text-sm items-center flex-1 font-bold text-left gap-2`

export const PersonWrap = tw.div`w-[29%] h-full border-gray-300 flex items-center py-1`
export const PersonBtn = tw.button`flex text-sm items-center flex-1 font-bold text-left gap-2`

export const SvgWrap = tw.div`ml-4 w-6`
export const Svg = tw.img`w-6`

export const RemoveBtn = tw.button`mr-2 w-6`

export const SearchBtn = tw.button`h-full w-[8%] rounded-md bg-black flex items-center justify-center`

