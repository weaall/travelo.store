import tw from "tailwind-styled-components"


export const Container = tw.div`flex flex-col items-center space-y-5 py-8`
export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`

export const Label = tw.p`text-xl font-semibold mb-4`

export const BookingWrap = tw.div`flex flex-col items-center text-center border p-8 mx-1 max-w-[640px] w-full rounded-xl`
export const BookingLabel = tw.label`text-xl text-green-600 font-semibold`
export const BookingText = tw.text``
export const BookingSpan = tw.span`text-green-600 font-semibold`
export const BookingBtn = tw.button`mt-6 mx-1 text-lg font-medium px-20 h-12 rounded-xl bg-black text-white 
mobile:w-full mobile:px-0`

export const Img = tw.img`w-full h-full object-cover rounded-xl
mobile:rounded-xl`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const OuterWrap = tw.div`flex flex-col border p-6 mx-1 gap-2 max-w-[640px] w-full rounded-xl`
export const OuterInfoWrap = tw.div`flex flex-col w-8/12 py-2 
mobile:w-full`
export const InfoWrap = tw.div`space-y-1`

export const HotelTitle = tw.p`text-base font-medium truncate
mobile:text-base`
export const HotelAddress = tw.p`text-gray-400 text-xs hover:cursor-pointer text-main`

export const RoomWrap = tw.div`w-full rounded-2xl bg-white h-36 shadow-md
mobile:flex mobile:flex-col mobile:h-auto`
export const Pic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const RoomInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1
mobile:flex-row`
export const RoomName = tw.h2`text-base font-medium truncate
mobile:text-sm`
export const RoomText = tw.p`text-xs text-gray-400
mobile:text-xs`

export const CheckWrap = tw.div`flex w-full border-y my-3`
export const CheckInWrap = tw.div`flex flex-col w-[50%] my-5 border-r text-left space-y-1`
export const CheckOutWrap = tw.div`flex flex-col w-[50%] my-5 text-right space-y-1`
export const CheckLabel = tw.label`text-sm text-gray-400
mobile:text-xs`
export const CheckText = tw.text`
mobile:text-sm`
export const GuideText = tw.text`text-sm text-center
mobile:text-xs`

export const DetailWrap = tw.div`flex flex-col border p-6 mx-1 max-w-[640px] w-full rounded-xl`
export const DetailRow = tw.div`flex border-b p-3 items-center`
export const DetailLabelWrap = tw.div`min-w-[35%]`
export const DetailLabel = tw.label`text-gray-400
mobile:text-xs`
export const DetailTextWrap = tw.div``
export const DetailText = tw.text`
mobile:text-xs`