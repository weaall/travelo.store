import tw from "tailwind-styled-components"


export const Container = tw.div`flex flex-col items-center space-y-6 py-10`
export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`

export const BookingWrap = tw.div`flex flex-col items-center text-center border p-8 mx-1 max-w-[640px] w-full rounded-xl`
export const BookingLabel = tw.label`text-xl text-green-600 font-semibold`
export const BookingText = tw.text``
export const BookingSpan = tw.span`text-green-600 font-semibold`
export const BookingBtn = tw.button`mt-6 text-lg font-medium px-20 py-3 rounded-xl bg-black text-white`

export const Img = tw.img`w-full h-full object-cover rounded-l-xl
mobile:rounded-xl`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const OuterWrap = tw.div`flex flex-col border p-4 mx-1 gap-2 max-w-[640px] w-full rounded-xl`
export const OuterInfoWrap = tw.div`flex flex-col w-8/12 py-2 
mobile:w-full`
export const InfoWrap = tw.div`space-y-1`

export const HotelTitle = tw.p`text-base font-medium truncate
mobile:text-lg`
export const HotelAddress = tw.p`text-gray-400 text-xs hover:cursor-pointer text-main`

export const RoomWrap = tw.div`w-full rounded-2xl bg-white shadow-md h-36
mobile:flex mobile:flex-col mobile:h-auto`
export const Pic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const RoomInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1
mobile:flex-row`
export const RoomName = tw.h2`text-base font-medium truncate
mobile:text-sm`
export const RoomText = tw.p`text-xs text-gray-400
mobile:text-xs`

export const CheckWrap = tw.div`flex max-w-[640px] w-full border-y`
export const CheckInWrap = tw.div`flex flex-col w-[50%] my-4 border-r text-left`
export const CheckOutWrap = tw.div`flex flex-col w-[50%] my-4 text-right`
export const CheckLabel = tw.label`text-sm text-gray-400`
export const CheckText = tw.text``