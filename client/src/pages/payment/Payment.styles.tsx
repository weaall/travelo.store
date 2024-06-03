import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center`
export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center`

export const MainContainer = tw.div`w-full h-full flex py-3
mobile:flex-col-reverse mobile:gap-3`
export const LeftWrap = tw.div`flex flex-col gap-3 w-3/5
mobile:w-full`
export const RightWrap = tw.div`flex flex-col gap-3 w-2/5
mobile:w-full`

export const Img = tw.img`w-full h-full object-cover rounded-l-xl
mobile:rounded-xl`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const Label = tw.p`text-xl font-semibold mb-4`

export const OuterWrap = tw.div`flex flex-col border mx-2 p-4 gap-4`
export const HotelInfoWrap = tw.div`space-y-1`
export const HotelTitle = tw.p`text-base font-medium truncate
mobile:text-lg`
export const HotelAddress = tw.p`text-gray-400 text-xs hover:cursor-pointer
mobile:text-main`

export const RoomWrap = tw.div`w-full rounded-2xl bg-white shadow-md h-36
mobile:flex mobile:flex-col mobile:h-auto`
export const RoomPic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const RoomInfoWrap = tw.div`flex flex-col w-8/12 py-2 
mobile:w-full`
export const RoomInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1
mobile:flex-row`
export const InfoWrap = tw.div`space-y-1
mobile:w-3/5`
export const RoomName = tw.h2`text-base font-medium truncate
mobile:text-sm`
export const RoomLabel = tw.p`text-sm text-gray`
export const RoomText = tw.p`text-xs text-gray-500
mobile:text-xs`

export const PriceWrap = tw.div`flex flex-col`
export const TotalLabel = tw.p`text-xs text-gray-400`
export const TotalPrice = tw.p`text-xl text-red-500 font-bold
mobile:text-xl`

export const UserWrap = tw.div`flex flex-col mx-2 border p-5`
export const UserLabel = tw.label`
after:content-['*'] after:text-red-500`
export const UserInput = tw.input`font-medium outline-none
w-full h-10 px-6 rounded-lg bg-gray-100 my-1`

export const PolicyWrap = tw.div`flex flex-col mx-2 border p-5`
export const PolicyCheck = tw.input`appearance-none h-5 w-5 mr-1 border border-gray-300 rounded bg-white
checked:bg-main checked:border-transparent focus:outline-none transition duration-200 cursor-pointer`
export const PolicyTextMain = tw.p`text-base pb-2`
export const PolicyText = tw.p`pl-1 text-sm text-gray-500`

export const RoomPriceWrap = tw.div``
export const OptionWrap = tw.div``

