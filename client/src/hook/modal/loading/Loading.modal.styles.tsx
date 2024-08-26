import tw from "tailwind-styled-components"

export const Container = tw.div`w-full h-full inset-0 bg-black bg-opacity-50 fixed top-0 z-100
backdrop-blur-sm animate-backdrop`
export const ModalWrap = tw.div`max-w-[28rem] w-auto h-auto flex flex-col rounded-[16px] p-6
absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
animate-modal`
