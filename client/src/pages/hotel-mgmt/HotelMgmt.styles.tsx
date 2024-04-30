import tw from "tailwind-styled-components"

export const Container = tw.div`h-full w-full flex flex-col items-center`

export const HotelStateWrap = tw.div`mt-6 w-full h-20 rounded-3xl bg-gray-100 py-3 px-10`
export const UpperWrap = tw.div`flex justify-between items-center`
export const LowerWrap = tw.div`flex justify-between items-center`
export const HotelName = tw.h3`font-bold text-lg`
export const HotelText = tw.p`text-sm`

export const NavWrap = tw.nav`flex w-full max-w-[840px] h-10 m-3 px-10 justify-between items-center`
export const NavBtn = tw.button`w-[25%] py-3 hover:bg-main/[0.1]`

export const ContentsWrap = tw.div`w-full`