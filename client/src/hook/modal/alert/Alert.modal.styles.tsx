import tw from "tailwind-styled-components"

export const Container = tw.div`w-full h-full inset-0 bg-black bg-opacity-50 fixed top-0 z-100
backdrop-blur-sm animate-backdrop`
export const ModalWrap = tw.div`max-w-[28rem] w-auto h-auto flex flex-col rounded-[16px] p-6
bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
animate-modal`

export const ContentsWrap = tw.div`flex flex-col items-center px-4`

export const Message = tw.p`font-medium text-base text-center py-4 pb-6 truncate`

export const ConfirmBtn = tw.button` 
w-20 mx-1 text-sm font-medium px-5 py-3 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`
