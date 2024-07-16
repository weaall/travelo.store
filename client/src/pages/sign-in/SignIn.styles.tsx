import tw from "tailwind-styled-components"

interface UnderTagProps {
    $validator: boolean
}
interface SignInBtnProps {
    $validator: boolean
}

export const Container = tw.div`min-h-screen-16 w-full flex flex-col items-center justify-center`

export const ContentsWrap = tw.div`max-w-[480px] px-8 w-full flex flex-col pb-6`

export const ContentsLabel = tw.p`text-xl text-center pt-4 pb-6`
export const ContentsText = tw.p`text-xl text-center pt-4 pb-6`

export const InputWrap = tw.div`flex flex-col text-left`
export const UpperTag = tw.p<UnderTagProps>`text-sm font-medium mt-3
${(p) => (p.$validator ? "text-black" : "text-red-400")}`;
export const Input = tw.input<UnderTagProps>`text-sm w-full h-10 outline-none border-b border-gray-200 placeholder-gray-200
focus:border-b-2 focus:placeholder-transparent
${(p) => (p.$validator ? "focus:border-black" : "border-red-400 focus:border-b-1")}`;
export const UnderTag = tw.p<UnderTagProps>`text-xs font-normal h-[16px]
${(p) => (p.$validator ? "text-blue-500" : "text-red-400")}`

export const SignInBtn = tw.button<SignInBtnProps>` 
w-full h-12 font-medium my-2 rounded-xl bg-black text-white
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] mobile:hover:bg-black" : "bg-gray-200")}`

export const SignUpWrap = tw.div`w-full flex justify-center py-2 mb-5 space-x-6`
export const SignUpCenter = tw.div`border-x flex py-0 px-6 border-gray-200`
export const SignUpBtn = tw.a`border-none text-xs cursor-pointer`

export const SocialWrap = tw.div`w-full flex items-center`
export const SocialButtonWrap = tw.div`w-full flex flex-col`
export const SocialButton = tw.button`w-full h-12 relative flex my-2 px-5 rounded-xl bg-white border-[1px] items-center`
export const SocialSVG = tw.img`h-6 w-6`
export const SocailLabel = tw.p` absolute left-1/2 transform -translate-x-1/2 text-sm font-medium`