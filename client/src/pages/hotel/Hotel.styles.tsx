import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center`

export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center`

export const MainContainer = tw.div`w-full h-full pb-10`

export const SearchWrap = tw.div`mobile:hidden sticky top-0 z-10`
export const SearchWrapMobile = tw.div`hidden mobile:block sticky top-0 z-50`

export const HotelWrap = tw.div`flex flex-col items-center space-y-6 my-2`
export const HotelPic = tw.div`px-6 w-full h-96 rounded-2xl mobile:h-60
mobile:px-4`

export const HotelInfoWrap = tw.div`w-full space-y-2`
export const HotelFlexWrap = tw.div`flex flex-col w-auto mx-6 p-4 border space-y-2
mobile:mx-0`
export const HotelTitle = tw.p`text-2xl font-semibold truncate`
export const HotelAddress = tw.p`text-main text-sm font-medium pl-1 truncate hover:cursor-pointer`
export const AddressSVG = tw.img`w-3`
export const HotelDesc = tw.p`border-t mt-2 pt-2 text-sm text-gray-400`

export const Label = tw.p`text-xl font-semibold`
export const HotelServ = tw.div`flex flex-wrap`
export const HotelTextWrap = tw.div`flex items-center h-auto w-1/5
mobile:w-1/3`
export const HotelText = tw.p`text-sm
mobile:text-xs`
export const HotelSvg = tw.img`w-4 mr-1`

export const RoomList = tw.div`flex flex-col gap-6 mx-6 px-4 py-6 border
mobile:mx-0`

export const RoomWrap = tw.div`w-full rounded-2xl bg-white shadow-md h-60 
mobile:flex mobile:flex-col mobile:h-auto`
export const RoomPic = tw.div`w-4/12 h-60 bg-gray-30
mobile:h-40 mobile:w-full`

export const RoomInfoWrap = tw.div`flex flex-col w-8/12 py-2 
mobile:w-full`
export const HotelInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1
mobile:flex-row`
export const InfoWrap = tw.div`space-y-1
mobile:w-3/5`
export const RoomName = tw.h2`text-xl font-semibold truncate
mobile:text-sm`
export const RoomLabel = tw.p`text-sm text-gray`
export const RoomText = tw.p`text-sm text-gray
mobile:text-xs`

export const PriceWrap = tw.div`flex flex-col text-end
mobile:w-2/5 mobile:itmes-bottom`
export const TotalLabel = tw.p`text-xs text-gray-400`
export const TotalPrice = tw.p`text-xl text-red-500 font-bold
mobile:text-xl`

export const BookBtnWrap = tw.div`text-end`
export const BookBtn = tw.button`mt-2 text-lg font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`