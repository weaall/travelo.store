import tw from "tailwind-styled-components"

interface UnderTagProps {
    $validator: boolean
}
interface RegBtnProps {
    $validator: boolean
}

export const Container = tw.div`min-h-screen-16 w-full flex flex-col items-center justify-center`

export const ContentsWrap = tw.div`max-w-[480px] px-8 w-full flex flex-col pb-6`

export const ContentsLabel = tw.p`text-2xl font-extrabold py-4`

export const FlexWrap = tw.div`flex justify-center items-center text-center`

export const UpperTag = tw.p<UnderTagProps>`text-sm font-medium mt-3
${(p) => (p.$validator ? "text-black" : "text-red-400")}`;
export const Input = tw.input<UnderTagProps>`text-sm w-full h-10 outline-none border-b border-gray-200 placeholder-gray-200
focus:border-b-2 focus:placeholder-transparent disabled:bg-white disabled:text-gray-300
${(p) => (p.$validator ? "focus:border-black" : "border-red-400 focus:border-b-1")}`;
export const UnderTag = tw.p<UnderTagProps>`text-xs font-normal h-[16px]
${(p) => (p.$validator ? "text-blue-500" : "text-red-400")}`

export const VerifyBtn = tw.button<RegBtnProps>`w-2/5 ml-4 h-12 font-medium rounded-xl bg-black text-white
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] mobile:hover:bg-black" : "bg-gray-200")}`

export const RegBtn = tw.button<RegBtnProps>`w-full h-12 font-medium my-2 rounded-xl bg-black text-white
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] mobile:hover:bg-black" : "bg-gray-200")}`

export const CheckBox = tw.input`w-5 h-5 cursor-pointer accent-main mx-2 my-4`
export const CheckLabel = tw.p`text-xs text-center px-3`
export const Terms = tw.span`text-main font-bold cursor-pointer`

