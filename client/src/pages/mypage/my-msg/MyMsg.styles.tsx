import tw from "tailwind-styled-components"

interface CheckedProps{
    $checked: number
}

export const Container = tw.div`w-full h-full flex flex-col items-center`
export const FlexWrap = tw.div`flex
mobile:flex-col`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold 
mobile:ml-4`

export const ContentsWrap = tw.div`flex flex-col w-full space-y-3 mt-4`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const MsgWrap = tw.div`flex w-full rounded-2xl bg-white h-auto shadow-md border p-4 cursor-pointer
mobile:flex`

export const PicWrap = tw.div`w-[20%] flex justify-center`
export const Pic = tw.div`w-16 h-16 bg-gray-30 mr-4 mobile:w-12 mobile:h-12`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const MsgInfoWrap = tw.div`flex flex-col justify-between py-1 w-[80%]`

export const UpperWrap = tw.div`w-full flex justify-between items-center`
export const Name = tw.p`font-bold
mobile:text-sm`
export const Time = tw.p`text-sm font-medium
mobile:text-xs`

export const LowerWrap = tw.div`w-full flex justify-between items-center`
export const Text = tw.p`text-sm max-w-[340px] truncate text-gray-400 font-medium
mobile:max-w-[75%] mobile:text-xs`
export const Checked = tw.div<CheckedProps>`w-2 h-2 bg-main rounded-full
${(p) => (p.$checked === 0 ? "block" : "hidden")}`
