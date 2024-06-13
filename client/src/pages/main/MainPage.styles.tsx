import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center min-h-screen-16`

export const MainContainer = tw.div`flex flex-col w-full min-h-screen-16 justify-center bg-main/[0.2]`

export const SearchContainer = tw.div`flex bg-white shadow-md flex rounded-2xl px-4 py-4 mx-3
mobile:flex-col mobile:space-y-3 mobile:bg-gray-100`

export const SearchWrap = tw.div`w-5/12 h-full flex items-center justify-between p-1 py-4 border-transparent
mobile:w-full mobile:border mobile:rounded-xl mobile:bg-white`
export const SearchInput = tw.input`text-sm px-2 flex-1 font-bold outline-none`
 
export const CalendarWrap = tw.div`w-3/12 h-full border-gray-300 flex items-center p-1 py-4 border-transparent
mobile:w-auto mobile:border mobile:rounded-xl mobile:bg-white`
export const CalendarBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2`

export const PersonWrap = tw.div`w-3/12 h-full flex items-center p-1 py-4 border-transparent
mobile:w-auto mobile:border mobile:rounded-xl mobile:bg-white`
export const PersonBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2`

export const SvgWrap = tw.div`ml-4 w-6 h-full`
export const Svg = tw.img`w-6 h-full`

export const RemoveBtn = tw.button`mr-4 w-6`

export const SearchBtn = tw.button`w-1/12 h-full rounded-md bg-black flex items-center justify-center py-4
mobile:hidden`

export const SearchBtnMobile = tw.button`mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white hidden
mobile:block`

