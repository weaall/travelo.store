import tw from "tailwind-styled-components";

export const Container = tw.div`w-full`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2 px-6 py-6 border-b`
export const ContentsFlex = tw.div`w-full flex`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`

export const Title = tw.h3`w-[50%] py-6 text-2xl font-bold`

export const SetBtn = tw.button`p-3 font-bold hover:text-main`
export const ResetBtn = tw.button`p-3 font-bold hover:text-main`

export const Label = tw.p`text-base font-bold`
export const Text = tw.p`` 

export const OptionWrap = tw.div`flex flex-col h-20 space-y-3`

export const CheckBox = tw.input`ml-2 w-6 h-6 cursor-pointer accent-main`
export const InputBox = tw.input`mr-10 w-auto text-lg py-1 px-4 border border-black outline-main rounded-xl`
export const Select = tw.select`mr-10 w-auto text-lg py-1 px-4 border border-black outline-main rounded-xl`
export const DescInput = tw.textarea`my-2 w-auto h-full text-lg py-1 px-4 border border-black outline-main rounded-xl`
