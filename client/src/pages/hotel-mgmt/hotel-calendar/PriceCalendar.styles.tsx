import tw from "tailwind-styled-components";

interface DayProps {
    $day: number
}

interface DateProps {
    $date: String
}

export const Container = tw.div`w-full h-full flex flex-col items-center `

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2`
export const ContentsFlex = tw.div`w-full flex items-center justify-between`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`
export const FlexWrap = tw.div`flex w-full justify-center`

export const MobileWrap = tw.div`flex flex-col w-full px-10 mb-10
mobile:w-full mobile:px-4`

export const TitleWrap = tw.div`flex items-center w-[50%]`
export const Title = tw.h3`text-2xl font-bold my-4
mobile:ml-2`

export const YearOuterWrap = tw.div`w-full text-center m-6`
export const YearWrap = tw.div`w-full flex justify-between`
export const YearMonth = tw.h2`text-xl font-bold`

export const NavWrap = tw.nav`mt-4`
export const NavBtn = tw.button`px-2 py-1 mx-1 bg-gray-100 rounded-lg text-sm font-bold hover:text-main`

export const AddBtn = tw.button`font-bold hover:text-main`

export const DaysWrap = tw.div`flex mb-4`
export const DayWrap = tw.div`w-[14%] text-center`
export const DayLabel = tw.p<DayProps>`font-bold
${(p) => (p.$day === 0 ? "text-red-500" : p.$day === 6 ? "text-blue-500" : "")}`

export const DatesWrap = tw.div`flex flex-wrap w-full`
export const DateWrap = tw.div`w-[14%] py-4 p-2 text-center flex flex-col text-center rounded-lg 
hover:bg-main/[0.15] cursor-pointer`
export const TodayWrap = tw.div`w-[14%] py-4 p-2 text-center flex flex-col text-center rounded-lg bg-gray-50
hover:bg-main/[0.15] cursor-pointer`
export const PastWrap = tw.div`w-[14%] py-4 p-2 text-center flex flex-col text-center rounded-lg text-gray-300`
export const DateLabel = tw.p<DateProps>`
${(p) => (p.$date === "today" ? "text-green-500 font-bold" : p.$date === "other" ? "text-gray-300" : "")}`

export const RoomNum = tw.p`text-xs`
export const RoomPrice = tw.p`text-xs text-blue-500`

export const PastPrice = tw.p`text-xs text-gray-300`

export const RoomWrap = tw.div`flex w-full h-auto border-b py-3 px-4 justify-between space-x-4 content-center mb-2`
export const RoomName = tw.h2`font-bold text-base
mobile:text-sm`
export const RoomText = tw.p`text-sm truncate
mobile:text:xs`