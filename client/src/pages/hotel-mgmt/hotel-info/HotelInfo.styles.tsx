import tw from "tailwind-styled-components";

export const Container = tw.div`w-full h-full flex flex-col items-center`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2`
export const ContentsFlex = tw.div`w-full flex`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const OneThirdCol = tw.div`w-[33%] flex flex-col`
export const TwoThirdCol = tw.div`w-[67%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`

export const MobileWrap = tw.div`flex flex-col w-full px-10 mb-10
mobile:w-full mobile:px-4`

export const TitleWrap = tw.div`flex items-center w-[50%]`
export const Title = tw.h3`text-2xl font-bold my-4
mobile:ml-2`

export const SetBtn = tw.button`p-3 font-bold hover:text-main`
export const ResetBtn = tw.button`p-3 font-bold hover:text-main`

export const Label = tw.p`text-base font-medium`
export const Text = tw.p`` 

export const OptionWrap = tw.div`flex flex-col h-20 space-y-3`
export const CheckWrap = tw.div`flex h-10 content-center items-center space-x-4`

export const CheckBox = tw.input`ml-2 w-5 h-5 cursor-pointer accent-main`
export const InputBox = tw.input`mr-4 w-auto text-sm py-1 px-2 border border-black outline-main rounded-lg`
export const Select = tw.select`mr-4 w-auto text-sm py-1 px-2 border border-black outline-main rounded-lg cursor-pointer`
export const DescInput = tw.textarea`h-full w-full p-3 border border-black my-2
outline-main rounded-lg text-sm resize-none overflow-y-hidden`

export const UploadWrap = tw.div`p-6 text-center bg-gray-100 rounded-2xl mb-4`
export const ImgLabel = tw.p`my-4 font-bold`

export const ImgContainer = tw.div`grid grid-cols-2 justify-center`
export const ImgOutWrap = tw.div`w-full h-auto relative content-center`
export const ImgWrap = tw.div`m-1`
export const Img = tw.img`rounded-lg`
export const RemoveBtn = tw.button`bg-gray-100/[0.9] py-1 px-2 rounded-lg text-semibold 
hover:text-main hover:font-bold absolute bottom-2 right-2 hover:scale-105`