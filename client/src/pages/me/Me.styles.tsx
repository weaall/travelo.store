import tw from "tailwind-styled-components"

export const Container = tw.div`mt-24 h-full flex flex-col items-center`

export const InputWrap = tw.div`flex flex-col text-left`
export const UpperTag = tw.label`text-ms font-bold py-0 my-0`
export const Input = tw.input`font-medium outline-none
w-full h-14 ps-6 pe-6 rounded-[16px] bg-main/[0.1] font-3xl my-1`;