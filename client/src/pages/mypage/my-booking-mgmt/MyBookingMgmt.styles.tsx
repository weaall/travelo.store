import tw from "tailwind-styled-components"


export const Container = tw.div`w-full h-full flex flex-col items-center mb-10`
export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 mb-8 text-2xl font-bold 
mobile:ml-4`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const ContentsWrap = tw.div`flex flex-col w-full space-y-3`

export const Label = tw.p`text-xl font-semibold mb-3
mobile:lg`

export const Img = tw.img`w-full h-full object-cover rounded-xl
mobile:rounded-xl`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const OuterWrap = tw.div`flex flex-col border p-6 mx-1 gap-2 max-w-[640px] w-full rounded-xl
mobile:mx-0`
export const OuterInfoWrap = tw.div`flex flex-col w-8/12 py-2 
mobile:w-full`
export const InfoWrap = tw.div`space-y-1`

export const HotelTitle = tw.p`text-base font-medium truncate
mobile:text-base`
export const AddressWrap = tw.div`flex items-start`;
export const HotelAddress = tw.p`text-main text-xs pl-1 hover:cursor-pointer`;
export const AddressSVG = tw.img`w-3 mt-0.5`;

export const RoomWrap = tw.div`w-full rounded-2xl bg-white h-36 shadow-md
mobile:flex mobile:flex-col mobile:h-auto`
export const Pic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const RoomInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1
mobile:flex-row`
export const RoomDetailWrap = tw.div`flex flex-col`
export const RoomDetail = tw.div`flex items-center py-0.5`
export const RoomSvg = tw.img`w-5 mr-2`
export const RoomName = tw.h2`text-base font-medium truncate`
export const RoomText = tw.p`text-xs
mobile:text-xs`

export const CheckWrap = tw.div`flex w-full border-y my-3`
export const CheckInWrap = tw.div`flex flex-col w-[50%] my-5 border-r text-left space-y-1`
export const CheckOutWrap = tw.div`flex flex-col w-[50%] my-5 text-right space-y-1`
export const CheckLabel = tw.label`text-xs text-gray-400
mobile:text-5xl`
export const CheckText = tw.text`text-sm
mobile:text-sm`

export const DetailWrap = tw.div`flex flex-col border p-6 mx-1 max-w-[640px] w-full rounded-xl
mobile:mx-0`
export const DetailRow = tw.div`flex border-b p-3 items-center`
export const DetailLabelWrap = tw.div`min-w-[35%]`
export const DetailLabel = tw.label`text-gray-400 text-sm
mobile:text-xs`
export const DetailTextWrap = tw.div``
export const DetailText = tw.text`text-sm
mobile:text-xs`

export const HotelServWrap = tw.div`flex flex-col border p-6 mx-1 w-full rounded-xl
mobile:mx-0`
export const HotelServ = tw.div`flex flex-wrap w-full`
export const HotelTextWrap = tw.div`flex items-center h-auto w-1/5
mobile:w-1/3`
export const HotelText = tw.p`text-sm
mobile:text-xs mobile:text-5xl`
export const HotelSvg = tw.img`w-4 mr-1
mobile:w-3`

export const MgmtWrap = tw.div`flex space-x-2
mobile:flex-col mobile:space-x-0 mobile:space-y-3`
export const MgmtBtn = tw.button`mt-2 w-1/3 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black mobile:w-full mobile:py-3`