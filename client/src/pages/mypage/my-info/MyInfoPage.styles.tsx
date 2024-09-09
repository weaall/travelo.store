import tw from "tailwind-styled-components"

interface ColorProps{
    $color: string
}

interface InputProps{
    $state: boolean
}

interface UnderTagProps {
    $validator: boolean
    $state: boolean
}

interface RegBtnProps {
    $validator: boolean
}

export const Container = tw.div`w-full h-full flex flex-col items-center`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold
mobile:ml-4`
export const Social = tw.p<ColorProps>`px-3 py-1 font-bold rounded-xl text-sm mx-6
${(p) => (p.$color === "kakao" ? "bg-kakao text-kakao-text" : p.$color === "naver" ? "bg-naver text-white" : "bg-white")}`;

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const InputWrap = tw.div`flex flex-col text-left w-full py-6 px-12`
export const UpperTag = tw.label`text-base font-bold py-0 my-0
after:content-['*'] after:text-red-500 after:px-1`
export const UpperTagNone = tw.label`text-base font-bold py-0 my-0`
export const Input = tw.input<InputProps>`outline-none w-full h-10 px-6 rounded-lg bg-gray-100 my-1
${(p) => (p.$state ? "" : "text-gray-400")}`
export const UnderTag = tw.p<UnderTagProps>`text-xs font-normal h-[16px]
${(p) => (p.$validator ? "text-blue-500" : "text-red-500")}
${(p) => (p.$state ? "" : "text-white")}`
export const UnderTagNone = tw.p`h-[16px]`


export const MgmtBtnWrap = tw.div`w-full flex justify-center`
export const MgmtBtn = tw.button<RegBtnProps>`text-base font-medium px-5 py-2 rounded-xl bg-black text-white
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8]" : "bg-gray-200")}`