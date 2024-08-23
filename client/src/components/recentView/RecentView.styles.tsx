import tw from "tailwind-styled-components"

export const Container = tw.div``

export const NoCookieWrap = tw.div`flex w-full justify-center items-center min-h-[112px]`

export const ContentsWrap = tw.div`px-6 space-y-2`
export const Lable = tw.p`text-sm font-semibold`
export const HotelList = tw.div`flex w-full space-x-4
mobile:flex-col mobile:space-x-0 mobile:space-y-1`
export const HotelWrap = tw.div`flex w-1/3 h-28 border rounded-2xl cursor-pointer
mobile:w-full`
export const HotelImgWrap = tw.div`h-full w-2/5`
export const HotelImg = tw.img``
export const HotelInfoWrap = tw.div`flex flex-col p-3 space-y-1`
export const HotelName = tw.p`text-xs truncate`
export const RatingWrap = tw.div`flex space-x-1`
export const RatingSvg = tw.img`w-3`
export const HotelRating = tw.p`text-xs font-bold`

