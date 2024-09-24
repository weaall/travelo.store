import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

interface LengthProps {
    $validator: boolean
}

interface Closing {
    $isClosing: boolean;
}

export const Container = tw.div<Closing>`w-full h-full bg-zinc-400/[0.3] fixed top-0 z-50
${(p) => (p.$isClosing ? "animate-closeBackdrop" : "animate-backdrop")}`
export const ModalWrap = tw.div<Closing>`max-w-[28rem] w-[80%] h-[34rem] flex flex-col rounded-[16px] p-6
bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
${(p) => (p.$isClosing ? "animate-closeModal" : "animate-modal")}
mobile:w-full mobile:h-full mobile:rounded-[0px]`

export const TitleWrap = tw.div`h-[10%]`

export const Title = tw.h2`font-bold text-2xl text-center`

export const CloseBtn = tw.button`w-8 absolute top-4 right-4 group`
export const CloseSVG = tw.img`h-full w-full group-hover-scale-105`

export const ContentsFlex = tw.div`w-full flex`

export const SubTitleWrap = tw.div`w-full flex justify-between`
export const SubTitle = tw.h3`w-[50%] py-4 text-base font-semibold mobile:text-base`
export const BookingId = tw.h3`w-[50%] py-4 text-sm text-right mobile:text-sm`

export const InputWrap = tw.div`flex flex-col text-left h-[90%] px-4 overflow-y-auto`
export const UpperTag = tw.label`text-ms font-bold py-0 my-2`

export const AddTextWrap = tw.div`py-1 bg-white rounded-b-xl`
export const AddTextField = tw.textarea`min-h-36 py-3 px-4 block border w-full my-2
outline-main rounded-lg text-sm resize-none overflow-y-hidden`
export const AddTextNum = tw.p<LengthProps>`text-end px-3 text-xs text-gray-500
${(p) => (p.$validator ? "" : "text-red-400")}`

export const RegBtn = tw.button<RegBtnProps>` 
w-full mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white
mobile:hover:bg-black
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] cursor-pointer" : "bg-gray-200")}`