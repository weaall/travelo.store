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

export const RegWrap = tw.div`h-[10%]`

export const RegBtn = tw.button<RegBtnProps>` 
w-full h-full font-bold text-white rounded-[16px]
${(p) => (p.$validator ? "bg-gradient-to-r from-main to-tomain" : "bg-gray-200")}`

export const InputWrap = tw.div`flex flex-col text-left h-[80%] px-4 overflow-y-auto`

export const ListWrap = tw.div`flex items-center py-3 px-6 justify-between`
export const BtnWrap = tw.div`flex justify-center space-x-3`
export const PlusBtn = tw.button`text-xl font-bold w-6`
export const MinusBtn = tw.button`text-xl font-bold w-6 group`
export const BtnSvg = tw.img`group-hover:fill-main`
export const Label = tw.label`text-lg font-bold`


