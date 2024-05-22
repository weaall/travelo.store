import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center`

export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center`

export const MainContainer = tw.div`w-full h-full pb-10`

export const HotelWrap = tw.div`flex flex-col items-center space-y-6 my-2`
export const HotelPic = tw.div`px-6 w-full h-96 rounded-2xl mobile:h-60`

export const HotelInfoWrap = tw.div`w-full space-y-2`
export const HotelFlexWrap = tw.div`flex flex-col w-auto mx-6 p-4 border space-y-2
mobile:mx-0`
export const HotelTitle = tw.p`text-2xl font-semibold truncate`
export const HotelAddress = tw.p`text-main text-sm font-medium pl-1 truncate`
export const AddressSVG = tw.img`w-3`
export const HotelDesc = tw.p`border-t mt-2 pt-2 text-sm text-gray-400`

export const Label = tw.p`text-xl font-semibold`
export const HotelServ = tw.div`flex flex-wrap`
export const HotelTextWrap = tw.div`flex items-center h-auto w-1/5
mobile:w-1/3`
export const HotelText = tw.p`text-xs`
export const HotelSvg = tw.img`w-4 mr-1`

export const RoomList = tw.div`flex flex-col gap-6 mx-6 px-4 py-6 border
mobile:mx-0`

export const RoomWrap = tw.div`w-auto rounded-2xl bg-white shadow-md hover:shadow-xl h-60
mobile:h-40`
export const RoomPic = tw.div`w-4/12 h-60 bg-gray-30
mobile:h-40 mobile:w-1/2`

export const RoomInfoWrap = tw.div`flex flex-col w-8/12 py-2
mobile:h-40 mobile:w-1/2`
export const HotelInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1`
export const RoomName = tw.h2`text-xl font-semibold
mobile:text-sm`
export const RoomLabel = tw.p`text-sm text-gray`
export const RoomText = tw.p`text-sm text-gray
mobile:text-xs`

export const PriceWrap = tw.div`flex flex-col text-end`
export const TotalLabel = tw.p`text-xs text-gray-400`
export const TotalPrice = tw.p`text-2xl text-red-500 font-bold
mobile:text-base`