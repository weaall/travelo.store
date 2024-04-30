import tw from "tailwind-styled-components"

interface UnderTagProps {
    $validator: boolean
}
interface SignInBtnProps {
    $validator: boolean
}

export const Container = tw.div`h-full flex flex-col items-center bg-gradient-to-r from-main to-tomain rounded-t-[32px]`

export const BannerWrap = tw.div`py-20`
export const BannerLabel = tw.h1`text-4xl text-white font-bold`

export const ContentsWrap = tw.div`bg-white w-full px-[10%] rounded-t-[32px] pt-10 text-center`

export const ContentsLabel = tw.p`text-3xl font-bold`
export const ContentsText = tw.p`text-base text-gray-400 py-3`

export const InputWrap = tw.div`flex flex-col text-left`
export const UpperTag = tw.label`text-ms font-bold py-0 my-0`
export const Input = tw.input`font-medium outline-none
w-full h-14 ps-6 pe-6 rounded-[16px] bg-main/[0.1] font-3xl my-1`;
export const UnderTag = tw.p<UnderTagProps>`text-xs font-normal h-[16px]
${(p) => (p.$validator ? "text-blue-500" : "text-red-500")}`

export const SignInBtn = tw.button<SignInBtnProps>` 
w-full h-14 font-bold text-white rounded-[16px] my-2
${(p) => (p.$validator ? "bg-gradient-to-r from-main to-tomain" : "bg-gray-200")}`

export const PwLabel = tw.button`text-main font-bold my-3`

export const SocialWrap = tw.div`flex flex-col py-8 text-center items-center`
export const SocialLabel = tw.p`text-gray-400`
export const SocialButtonWrap = tw.div`flex space-x-8 py-4`
export const SocialButton = tw.button`w-16 h-16 bg-gray-50 rounded-[12px] p-4`
export const SocialSVG = tw.img`h-full w-full`
