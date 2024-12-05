import tw from "tailwind-styled-components"

interface RemoveProps{
    $value: string;
}

export const Container = tw.div`flex flex-col items-center py-4`

export const MainContainer = tw.div`flex flex-col w-full justify-center space-y-8`

export const MobileContainer = tw.div`flex flex-col justify-center 
mobile:min-h-screen-3 mobile:relative mobile:w-full mobile:px-2`

export const SearchContainer = tw.div`flex shadow-md rounded-md p-1 h-14 border mx-6
mobile:w-full mobile:py-4 mobile:h-auto mobile:border-none mobile:mx-0 mobile:-translate-y-12 
mobile:flex-col mobile:space-y-4 mobile:bg-gray-100 mobile:rounded-2xl mobile:min-w-[0px] mobile:px-4`

export const SearchWrap = tw.div`w-[34%] h-full flex items-center justify-between py-1 border-r
mobile:w-full mobile:border-none mobile:rounded-xl mobile:bg-white mobile:py-4`
export const SearchInput = tw.input`w-full text-sm px-2 flex-1 font-bold outline-none`
 
export const CalendarWrap = tw.div`w-[29%] h-full border-r border-gray-300 flex items-center py-1
mobile:w-auto mobile:border-none mobile:rounded-xl mobile:bg-white mobile:py-4`
export const CalendarBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2 truncate`

export const PersonWrap = tw.div`w-[29%] h-full border-gray-300 flex items-center py-1
mobile:w-auto mobile:border-none mobile:rounded-xl mobile:bg-white mobile:py-4`
export const PersonBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2 truncate`

export const SvgWrap = tw.div`ml-4 w-6`
export const Svg = tw.img`w-6`

export const RemoveBtn = tw.button<RemoveProps>`mr-2 w-6
${(p) => (p.$value === "" ? "hidden" : "block")}`

export const SearchBtn = tw.button`h-full w-[8%] rounded-md bg-black flex items-center justify-center
mobile:hidden`

export const SearchBtnMobile = tw.button`mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white hidden
mobile:block`

