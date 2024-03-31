import tw from "tailwind-styled-components";

interface DayProps {
    $day: number
}

interface DateProps {
    $date: String
}

export const Container = tw.div`mx-auto px-4 py-8`
export const FlexWrap = tw.div`flex w-full justify-center`

export const TitleWrap = tw.div`text-center mb-8`
export const YearMonth = tw.h2`text-xl font-bold`

export const NavWrap = tw.nav`mt-4`
export const NavBtn = tw.button`px-2 py-1 mx-1 bg-gray-100 rounded-lg text-sm font-bold hover:text-main`

export const BtnWrap = tw.div``
export const AddBtn = tw.button`p-2 font-bold hover:text-main`

export const DaysWrap = tw.div`flex mb-4`
export const DayWrap = tw.div`w-[14%] text-center`
export const DayLabel = tw.p<DayProps>`font-bold
${(p) => (p.$day === 0 ? "text-red-500" : p.$day === 6 ? "text-blue-500" : "")}`

export const DatesWrap = tw.div`flex flex-wrap w-full`
export const DateWrap = tw.div`w-[14%] py-4 p-2 text-center flex flex-col text-center`
export const DateLabel = tw.p<DateProps>`
${(p) => (p.$date === "today" ? "text-green-500 font-bold" : p.$date === "other" ? "text-gray-300" : "")}`
export const RoomNum = tw.p`text-xs`
export const RoomPrice = tw.p`text-xs text-blue-500`