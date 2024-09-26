import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

interface DayProps {
    $day: number
}

interface DateProps {
    $date: String
}

interface StartDateProps{
    $date: String
}

interface Closing {
    $isClosing: boolean;
}

export const Container = tw.div<Closing>`w-full h-full bg-zinc-400/[0.3] fixed top-0 z-50
${(p) => (p.$isClosing ? "animate-closeBackdrop" : "animate-backdrop")}`

export const ModalWrap = tw.div<Closing>`max-w-[28rem] w-[80%] h-[34rem] flex flex-col rounded-[16px] p-6
bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
${(p) => (p.$isClosing ? "animate-closeModal mobile:animate-closeMobileModal" : "animate-modal mobile:animate-mobileModal")}
mobile:w-full mobile:h-full mobile:rounded-t-2xl mobile:mt-6`

export const TitleWrap = tw.div`h-[10%]`

export const Title = tw.h2`font-bold text-2xl text-center`

export const CloseBtn = tw.button`w-8 absolute top-4 right-4 group`
export const CloseSVG = tw.img`h-full w-full group-hover-scale-105`

export const RegWrap = tw.div`h-[10%] my-3`

export const RegBtn = tw.button<RegBtnProps>`
w-full mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white
mobile:hover:bg-black
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8]" : "bg-gray-200")}`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2 px-6 py-6 border-b`
export const ContentsFlex = tw.div`w-full flex items-center justify-between`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`
export const FlexWrap = tw.div`flex w-full justify-center`

export const CalendarWrap = tw.div`h-[80%] px-6 mobile:px-2`
export const CalTitleWrap = tw.div`flex items-center justify-between mb-3`

export const YearWrap = tw.div`w-full flex justify-start px-4`
export const YearMonth = tw.h2`text-lg font-bold
mobile:text-base`

export const NavWrap = tw.nav`w-full flex justify-end px-4 space-x-2`
export const NavBtn = tw.button`w-7
mobile:w-6`
export const NavSvg = tw.img``

export const AddBtn = tw.button`font-bold hover:text-main`

export const DaysWrap = tw.div`flex mb-2 justify-center`
export const DayWrap = tw.div`w-[14%] text-center`
export const DayLabel = tw.p<DayProps>`font-bold
${(p) => (p.$day === 0 ? "text-red-500" : p.$day === 6 ? "text-blue-500" : "")}`

export const DatesWrap = tw.div`flex flex-wrap w-full h-[60%] my-3 justify-center`
export const DateWrap = tw.div<StartDateProps>`w-[14%] p-2 text-center flex flex-col justify-center
hover:bg-gray-100 cursor-pointer mobile:hover:bg-main/[.25]
${(p) => (p.$date === "startDate" ? "bg-main/[.25] rounded-l-xl" :  p.$date === "endDate" ? "bg-main/[.25] rounded-r-xl"  :
p.$date === "betweenDate" ? "bg-main/[.13]" : "")}`
export const PastWrap = tw.div`w-[14%] py-4 p-2 text-center flex flex-col rounded-lg text-gray-300`
export const DateLabel = tw.p<DateProps>`
${(p) => (p.$date === "today" ? "text-main font-bold" : p.$date === "other" ? "text-gray-300" : "")}`

export const SelectWrap = tw.div`flex border-t mx-4 mobile:mx-2`
export const UpperTag = tw.p`text-xs`
export const SelectLabel = tw.p`text-center text-xl font-bold
mobile:text-base`
export const StartWrap = tw.div`w-1/2 p-2 border-r`
export const EndWrap = tw.div`w-1/2 p-2`

