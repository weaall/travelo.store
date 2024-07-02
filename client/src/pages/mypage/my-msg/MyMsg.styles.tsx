import tw from "tailwind-styled-components"

interface ColorProps{
    $color: string
}

export const Container = tw.div`w-full h-full flex flex-col items-center`
export const FlexWrap = tw.div`flex
mobile:flex-col`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold 
mobile:ml-4`

export const ContentsWrap = tw.div`flex flex-col w-full space-y-3`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`