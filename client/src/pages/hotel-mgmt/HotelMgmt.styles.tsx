import tw from "tailwind-styled-components"

interface ColorProps{
    $color: boolean
}

interface DrawerProps{
    $active: boolean
}

export const Container = tw.div`h-full flex flex-col items-center mobile:relative`

export const HotelStatusWrap = tw.div`flex w-full h-auto border-b py-3 px-4 justify-between space-x-4 content-center mb-2
cursor-pointer`
export const HotelName = tw.h3`font-bold text-base
mobile:text-sm`
export const HotelAddress = tw.p`flex-1 text-center text-sm truncate
mobile:text:xs`
export const HotelStatus = tw.p<ColorProps>`text-xs font-medium bg-green-200 text-lime-950 py-1 px-2 rounded-lg
${(p) => (p.$color ? "text-red-950 bg-red-200" : "")}`

export const FlexWrap = tw.div`flex w-full h-full`

export const ContentsWrap = tw.div`flex h-full w-full`
export const DrawerWrap = tw.div`h-auto mobile:hidden`
export const DrawerBtn = tw.button`hidden
mobile:block`
export const Svg = tw.img`w-7`
export const DrawerWrapMobile = tw.div<DrawerProps>`h-auto w-full hidden absolute top-10
${(p) => (p.$active ? "mobile:block" : "mobile:hidden")}`