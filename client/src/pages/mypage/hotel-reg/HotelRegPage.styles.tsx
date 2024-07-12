import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

interface UnderTagProps {
    $validator: boolean
}

export const Container = tw.div`w-full h-full flex flex-col items-center`

export const FlexWrap = tw.div`flex`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold
mobile:ml-4`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const InputWrap = tw.div`flex flex-col text-left w-full py-6 px-12`
export const UpperTag = tw.label`text-base font-bold py-0 my-0
after:content-['*'] after:text-red-500 after:px-1`
export const UpperTagNon = tw.label`text-base font-bold py-0 my-0`
export const Input = tw.input`font-medium outline-none
w-full h-10 px-6 rounded-lg bg-gray-100 my-1`;
export const UnderTag = tw.p<UnderTagProps>`text-xs font-normal h-[16px] mb-1
${(p) => (p.$validator ? "text-blue-500" : "text-red-500")}`

export const SearchBtn = tw.button` 
w-full h-10 font-medium text-white rounded-lg my-1 ml-4 bg-black`

export const RegBtn = tw.button<RegBtnProps>` 
w-full h-10 font-medium text-white rounded-lg my-6 text-base 
${(p) => (p.$validator ? "bg-black" : "bg-gray-200")}`


export const UploadWrap = tw.div`p-6 text-center bg-gray-100 rounded-2xl my-1`
export const ImgLabel = tw.p`my-2 font-bold`

export const ImgContainer = tw.div`grid grid-cols-2 justify-center`
export const ImgOutWrap = tw.div`w-full h-auto relative content-center`
export const ImgWrap = tw.div`m-1`
export const Img = tw.img`rounded-lg`
export const RemoveBtn = tw.button`bg-gray-100/[0.9] py-1 px-2 rounded-lg text-semibold 
hover:text-main hover:font-bold absolute bottom-2 right-2 hover:scale-105`