import tw from "tailwind-styled-components"

export const Container = tw.div``
export const ContentsWrap = tw.div`flex flex-col items-center px-[10%]`

export const Input = tw.input`w-full h-14 ps-6 pe-6 rounded-[12px] border border-main outline-main my-1`

export const RegBtn = tw.button`bg-gradient-to-r from-teal-400 to-teal-300 
w-full h-14 font-bold text-white rounded-[12px] my-1`

export const PwLabelWrap = tw.div`ml-auto my-3`
export const PwLabel = tw.button`text-main font-bold`

export const SocialWrap = tw.div`flex flex-col py-16 text-center`
export const SocialLabel = tw.p`text-gray-400`
export const SocialButtonWrap = tw.div`flex space-x-8 py-4`
export const SocialButton = tw.button`w-16 h-16 bg-gray-50 rounded-[12px] p-4`
export const SocialSVG = tw.img`h-full w-full`
