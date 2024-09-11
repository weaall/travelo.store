import tw from "tailwind-styled-components"

interface SortProps{
    $active: boolean
}
interface StateProps{
    $state: number
}

export const Container = tw.div`w-full h-full flex flex-col items-center mb-10`
export const FlexWrap = tw.div`flex
mobile:flex-col`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold 
mobile:ml-4`

export const ContentsWrap = tw.div`flex flex-col w-full space-y-3`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`

export const BookingWrap = tw.div``

export const BookingIdWrap = tw.div`flex mx-4 my-4 justify-between`
export const BookingId = tw.p`text-sm font-semibold`

export const HotelInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1 w-8/12
mobile:w-full`
export const RoomName = tw.p`text-base font-semibold truncate
mobile:text-lg`

export const MgmtBtnWrap = tw.div`text-end px-4 pt-2 pb-4`
export const MgmtBtn = tw.button`w-full h-full bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`

export const Table = tw.table`w-full my-4 table-fixed mb-12`
export const Thead = tw.thead`bg-gray-50 text-left border-t border-t-gray-400 border-b border-b-gray-200 `
export const Tbody = tw.tbody`border-y-2 border-black`
export const Tr = tw.tr`text-center`
export const Th = tw.th<SortProps>`text-xs text-gray-500 font-medium px-5 py-2 cursor-pointer
${(p) => (p.$active ? "bg-main text-white" : " text-black")}`;
export const Td = tw.td`text-5xl py-1.5 font-medium border-b truncate`
export const TdState = tw.td<StateProps>`text-5xl px-5 py-1.5 font-medium border-b
  ${(p) =>
    p.$state === 0
      ? "bg-red-500 text-white" 
      : p.$state === 1
      ? "bg-green-500 text-white"     
      : p.$state === 2
      ? "text-main"    
      : p.$state === 3
      ? "bg-red-500 text-white"
      : p.$state === 4
      ? "text-red-500"       
      : ""}    `;
export const TdBtn = tw.td`text-5xl font-medium border-b text-white bg-black cursor-pointer hover:bg-black/[0.8]
mobile:hover:bg-black`

export const FilterWrap = tw.div`flex justify-between`
export const DateFilterWrap = tw.div`flex items-center gap-2 text-xs`;
export const DateInput = tw.input`border rounded px-1 py-1 `;
export const SelectFilter = tw.select`border rounded px-1 py-1 text-xs`
export const Option = tw.option``