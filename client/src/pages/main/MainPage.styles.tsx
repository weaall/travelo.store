import tw from "tailwind-styled-components"

interface RemoveProps{
    $value: string;
}

export const Container = tw.div`flex flex-col items-center min-h-screen-16`

export const MainContainer = tw.div`flex flex-col w-full min-h-screen-16 justify-center min-h-[640px] space-y-5`

export const SearchContainer = tw.div`flex bg-white shadow-md flex rounded-full px-2 py-3 mx-4 min-w-[640px] max-w-[640px]
mobile:flex-col mobile:space-y-3 mobile:bg-gray-100 mobile:rounded-2xl mobile:min-w-[0px] mobile:px-4`

export const SearchWrap = tw.div`w-[230px] h-full flex items-center justify-between py-4 border-transparent
mobile:w-full mobile:border mobile:rounded-xl mobile:bg-white`
export const SearchInput = tw.input`text-xs px-2 flex-1 font-bold outline-none truncate`
 
export const CalendarWrap = tw.div`w-[180px] h-full border-gray-300 flex items-center py-4 border-transparent
mobile:w-auto mobile:border mobile:rounded-xl mobile:bg-white`
export const CalendarBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2 truncate`

export const PersonWrap = tw.div`w-[154px] h-full flex items-center py-4 border-transparent
mobile:w-auto mobile:border mobile:rounded-xl mobile:bg-white`
export const PersonBtn = tw.button`text-sm items-center flex-1 font-bold text-left px-2 truncate`

export const SvgWrap = tw.div`ml-4 w-6 h-6`
export const Svg = tw.img`w-6 h-6`

export const RemoveBtn = tw.button<RemoveProps>`w-6
${(p) => (p.$value == "" ? "hidden" : "block")}`

export const SearchBtn = tw.button`h-full w-auto rounded-full bg-black flex items-center justify-center p-3 my-1
mobile:hidden`

export const SearchBtnMobile = tw.button`mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white hidden
mobile:block`

