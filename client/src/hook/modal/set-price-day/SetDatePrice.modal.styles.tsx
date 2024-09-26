import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

interface Closing {
    $isClosing: boolean;
}

export const Container = tw.div<Closing>`w-full h-full bg-zinc-400/[0.3] fixed top-0 z-50
${(p) => (p.$isClosing ? "animate-closeBackdrop" : "animate-backdrop")}`

export const ModalWrap = tw.div<Closing>`max-w-[28rem] w-[80%] h-[34rem] flex flex-col rounded-[16px] p-6
bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
${(p) => (p.$isClosing ? "animate-closeModal mobile:animate-closeMobileModal" : "animate-modal mobile:animate-mobileModal")}
mobile:w-full mobile:h-full mobile:rounded-t-2xl mobile:mt-6`

export const TitleWrap = tw.div`h-[10%]`

export const Title = tw.h2`font-bold text-2xl text-center`

export const CloseBtn = tw.button`w-8 absolute top-4 right-4 group`
export const CloseSVG = tw.img`h-full w-full group-hover-scale-105`

export const ContentsFlex = tw.div`w-full flex items-center`

export const SubTitle = tw.h3`w-full py-4 text-base font-bold`

export const InputWrap = tw.div`flex flex-col text-left h-[90%] mx-16 py-4 overflow-y-auto mobile:mx-4`
export const UpperTag = tw.label`after:content-['*'] after:text-red-500 after:px-1`
export const Input = tw.input`font-medium outline-none w-full h-10 px-6 rounded-lg bg-gray-100 my-1`;
export const Text = tw.p`ml-2`

export const RegBtn = tw.button<RegBtnProps>` my-3
w-full mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white
mobile:hover:bg-black
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8]" : "bg-gray-200")}`

