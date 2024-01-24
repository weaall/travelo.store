import tw from "tailwind-styled-components"

export const Container = tw.div`h-full flex flex-col items-center bg-gradient-to-r from-teal-400 to-teal-100 rounded-t-[32px]`


export const BannerWrap = tw.div`py-20`
export const BannerLabel = tw.h1`text-4xl text-white font-bold`

export const ContentsBg = tw.div`bg-white/[0.4] w-[90%] rounded-t-3xl h-3`
export const ContentsWrap = tw.div`bg-white w-full px-[10%] rounded-t-[32px] pt-10 text-center`

export const ContentsLabel = tw.p`text-3xl font-bold`
export const ContentsText = tw.p`text-base text-gray-400 py-3`

export const Input = tw.input`w-full h-14 ps-6 pe-6 rounded-[12px] border border-main outline-main my-2`

export const RegBtn = tw.button`bg-gradient-to-r from-teal-400 to-teal-200 
w-full h-14 font-bold text-white rounded-[12px] my-2`

export const PwLabel = tw.button`text-main font-bold my-3`

export const SocialWrap = tw.div`flex flex-col py-8 text-center items-center`
export const SocialLabel = tw.p`text-gray-400`
export const SocialButtonWrap = tw.div`flex space-x-8 py-4`
export const SocialButton = tw.button`w-16 h-16 bg-gray-50 rounded-[12px] p-4`
export const SocialSVG = tw.img`h-full w-full`
