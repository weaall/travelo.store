import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

export const Container = tw.div`mt-24 h-full flex flex-col items-center`

export const InputWrap = tw.div`flex flex-col text-left`
export const UpperTag = tw.label`text-ms font-bold py-0 my-0`
export const Input = tw.input`font-medium outline-none
w-full h-14 ps-6 pe-6 rounded-[16px] bg-main/[0.1] font-3xl my-1`;

export const RegBtn = tw.button<RegBtnProps>` 
w-full h-14 font-bold text-white rounded-[16px] my-2
${(p) => (p.$validator ? "bg-gradient-to-r from-main to-tomain" : "bg-gray-200")}`