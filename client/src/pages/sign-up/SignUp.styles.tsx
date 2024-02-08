import tw from "tailwind-styled-components"

interface UnderTagProps {
    $validator: boolean
}
interface RegBtnProps {
    $validator: boolean
}

export const Container = tw.div`h-full flex flex-col items-center py-10`

export const ContentsWrap = tw.div`bg-white w-full px-[10%] text-left`

export const ContentsLabel = tw.p`text-4xl font-extrabold py-10`

export const FlexWrap = tw.div`flex justify-center items-center text-center`

export const UpperTag = tw.label`text-ms font-bold py-0 my-0`
export const Input = tw.input`font-medium outline-none
w-full h-14 ps-6 pe-6 rounded-[16px] bg-main/[0.2] font-3xl my-1`;
export const UnderTag = tw.p<UnderTagProps>`text-xs font-normal h-[16px]
${(p) => (p.$validator ? "text-blue-500" : "text-red-500")}`

export const VerifyBtn = tw.button`bg-gradient-to-r from-teal-400 to-teal-200
w-2/5 h-14 font-bold text-white rounded-[16px] my-1 ml-4`

export const RegBtn = tw.button<RegBtnProps>` 
w-full h-14 font-bold text-white rounded-[16px] my-2
${(p) => (p.$validator ? "bg-gradient-to-r from-teal-400 to-teal-200" : "bg-gray-200")}`

export const CheckBox = tw.input`w-6 h-6 cursor-pointer accent-main mx-2`
export const CheckLabel = tw.p`text-sm py-6 text-center`
export const Terms = tw.span`text-main font-bold cursor-pointer`

