import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

export const Container = tw.div`w-full h-full bg-zinc-400/[0.3] fixed top-0`
export const ModalWrap = tw.div`max-w-[28rem] w-[80%] h-[34rem] flex flex-col rounded-[16px] p-6
bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
animate-modal`

export const TitleWrap = tw.div`h-[10%]`

export const Title = tw.h2`font-bold text-2xl text-center`

export const CloseBtn = tw.button`w-8 absolute top-4 right-4 group`
export const CloseSVG = tw.img`h-full w-full group-hover-scale-105`

export const ContentsFlex = tw.div`w-full flex`
export const HalfFlex = tw.div`w-[50%] flex justify-end`
export const HalfCol = tw.div`w-[50%] flex flex-col`

export const SubTitle = tw.h3`w-[50%] py-4 text-2xl font-bold`

export const InputWrap = tw.div`flex flex-col text-left h-[90%] mx-16 py-4 overflow-y-auto`
export const UpperTag = tw.label`text-ms font-bold py-0 my-2`
export const Input = tw.input`w-full text-sm py-1 px-2 border border-black outline-main rounded-lg`;
export const Text = tw.p`ml-2`

export const RegBtn = tw.button<RegBtnProps>` 
w-full mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white
mobile:hover:bg-black
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8]" : "bg-gray-200")}`

