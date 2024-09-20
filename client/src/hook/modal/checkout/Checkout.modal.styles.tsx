import tw from "tailwind-styled-components"

export const Container = tw.div`w-full h-full inset-0 bg-black bg-opacity-50 fixed top-0 z-100
backdrop-blur-sm animate-backdrop`
export const ModalWrap = tw.div`max-w-[28rem] w-[80%] h-[34rem] flex flex-col rounded-[16px] p-6
bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
animate-modal
mobile:w-full mobile:h-full mobile:rounded-none`

export const TitleWrap = tw.div`h-[10%]`

export const Title = tw.h2`font-bold text-2xl text-center`

export const CloseBtn = tw.button`w-8 absolute top-4 right-4 group`
export const CloseSVG = tw.img`h-full w-full group-hover-scale-105`

export const InputWrap = tw.div`h-[80%] overflow-y-auto`
export const PayWrap = tw.div`h-[10%] w-full`
export const PaymentBtn = tw.button`w-full mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`



