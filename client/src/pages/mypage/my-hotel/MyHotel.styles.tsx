import tw from "tailwind-styled-components"

interface ColorProps{
    $color: boolean
}

export const Container = tw.div`w-full h-full flex flex-col items-center`

export const MobileWrap = tw.div`flex flex-col w-full px-10 mb-10
mobile:w-full mobile:px-2`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold
mobile:ml-4`

export const NoHotelWrap = tw.div`w-full flex flex-col justify-center items-center space-y-10 py-16`
export const NoHotelText = tw.p`text-lg font-medium`
export const AddHotelBtn = tw.button`mt-2 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`

export const HotelList = tw.div`w-full flex flex-col space-y-3 items-center`

export const BookingWrap = tw.div`flex flex-col w-full rounded-2xl bg-white h-auto shadow-md border
mobile:flex mobile:flex-col mobile:h-auto`

export const UpperWrap = tw.div`flex mx-4 my-4 justify-between`
export const HotelName = tw.p`text-base font-semibold`
export const HotelStatus = tw.p<ColorProps>`text-xs font-medium bg-green-200 text-lime-950 py-1 px-2 rounded-lg
${(p) => (p.$color ? "text-red-950 bg-red-200" : "")}`

export const MiddleWrap = tw.div`flex
mobile:flex-col`

export const Pic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const HotelInfoWrap = tw.div`flex flex-col relative px-5 py-2 space-y-1 w-8/12
mobile:w-full`
export const AddressWrap = tw.div`flex items-start`
export const AddressSVG = tw.img`w-2.5 mt-1 mr-1`
export const HotelAddress = tw.p`text-gray-400 text-xs hover:cursor-pointer text-main pb-3`
export const HotelTel = tw.p`text-xs`

export const CheckWrap = tw.div`flex w-full border-y`
export const CheckInWrap = tw.div`flex flex-col w-[50%] my-3 border-r text-left space-y-1`
export const CheckOutWrap = tw.div`flex flex-col w-[50%] my-3 text-right space-y-1`
export const CheckLabel = tw.label`text-sm text-gray-400 text-xs
mobile:text-xs`
export const CheckText = tw.p`text-xs`

export const MgmtBtnWrap = tw.div`text-end px-4 pt-2 pb-4`
export const MgmtBtn = tw.button`mt-2 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`

