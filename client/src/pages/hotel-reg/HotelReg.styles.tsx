import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

export const Container = tw.div`h-full flex flex-col items-center`

export const InputWrap = tw.div`flex flex-col text-left`
export const UpperTag = tw.label`text-ms font-bold py-0 my-0`
export const Input = tw.input`font-medium outline-none
w-full h-14 ps-6 pe-6 rounded-[16px] bg-main/[0.1] font-3xl my-1`;

export const RegBtn = tw.button<RegBtnProps>` 
w-full h-14 font-bold text-white rounded-[16px] my-2
${(p) => (p.$validator ? "bg-gradient-to-r from-main to-tomain" : "bg-gray-200")}`

export const UploadWrap = tw.div`p-6 text-center bg-gray-100 rounded-2xl my-4`
export const ImgLabel = tw.p`my-4 font-bold`

export const ImgContainer = tw.div`grid grid-cols-2 justify-centers`
export const ImgWrap = tw.div`w-full h-auto relative`
export const Img = tw.img`rounded-lg`
export const RemoveBtn = tw.button`py-2 hover:text-main hover:font-bold`