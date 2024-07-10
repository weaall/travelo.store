import tw from "tailwind-styled-components"

interface ColorProps{
    $color: string
}

export const Container = tw.div`h-full flex flex-col items-center`

export const HotelStateWrap = tw.div`flex w-full h-auto border-b py-3 px-4 justify-between space-x-4 content-center mb-2`
export const HotelName = tw.h3`font-bold text-base
mobile:text-sm`
export const HotelAddress = tw.p`flex-1 text-center text-sm truncate
mobile:text:xs`
export const HotelStatus = tw.p`text-xs font-medium bg-green-200 text-lime-950 py-1 px-2 rounded-lg`

export const FlexWrap = tw.div`flex w-full h-full`

export const DrawerWrap = tw.div`h-auto`
export const ContentsWrap = tw.div`flex h-full w-full`