import tw from "tailwind-styled-components"

export const Container = tw.div`flex flex-col items-center space-y-5 py-8`
export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`

export const ContentsWrap = tw.div`flex flex-col items-center h-full py-2`
export const ImgWrap = tw.div`w-32 py-10`
export const Img = tw.img`w-full`

export const LabelWrap = tw.div`flex flex-col text-center mb-3`
export const Label = tw.label`text-2xl font-bold`

export const ExpWrap = tw.div`flex flex-col py-8 space-y-2`
export const ExpLabel = tw.label`text-gray-400 text-base mb-2`
export const Text = tw.text`text-sm`

export const ReturnBtn = tw.button`mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white`