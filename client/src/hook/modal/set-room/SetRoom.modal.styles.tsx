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
export const HalfFlex = tw.div`w-[50%] flex justify-end `

export const SubTitleWrap = tw.div`w-full flex`
export const SubTitle = tw.h3`w-[50%] py-4 text-lg font-bold mobile:text-lg`

export const SetBtn = tw.button`font-bold hover:text-main mobile:text-sm`
export const ResetBtn = tw.button`font-bold hover:text-main mobile:text-sm mr-4`

export const InputWrap = tw.div`flex flex-col text-left h-[90%] px-4 overflow-y-auto`
export const UpperTag = tw.label`text-ms font-bold py-0 my-2`
export const Input = tw.input`w-auto text-sm py-1 px-2 border border-black outline-main rounded-lg`;
export const Select = tw.select`w-auto text-sm py-1 px-2 border border-black outline-main rounded-lg cursor-pointer`

export const UploadWrap = tw.div`p-6 text-center bg-gray-100 rounded-2xl my-4`
export const ImgLabel = tw.p`my-4 font-bold mobile:text-sm`

export const ImgContainer = tw.div`grid grid-cols-2 justify-center`
export const ImgOutWrap = tw.div`w-full h-auto relative content-center`
export const ImgWrap = tw.div`m-1`
export const Img = tw.img`rounded-lg`
export const RemoveBtn = tw.button`bg-gray-100/[0.9] py-1 px-2 rounded-lg text-semibold 
hover:text-main hover:font-bold absolute bottom-2 right-2 hover:scale-105`