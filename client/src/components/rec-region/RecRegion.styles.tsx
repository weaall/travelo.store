import tw from "tailwind-styled-components"

export const Container = tw.div``

export const NoCookieWrap = tw.div`flex w-full justify-center items-center min-h-[112px]`

export const ContentsWrap = tw.div`px-6 space-y-2`
export const Lable = tw.p`text-sm font-semibold`
export const RegionList = tw.div`flex w-full space-x-4
mobile:flex-wrap mobile:space-x-0 mobile:space-y-2`
export const RegionWrap = tw.div`relative rounded-full cursor-pointer
mobile:w-1/3`
export const ImgWrap = tw.div`w-28 h-28 opacity-60 
mobile:w-full mobile:h-12`
export const RegionLabel = tw.p`absolute text-white font-bold top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-2`