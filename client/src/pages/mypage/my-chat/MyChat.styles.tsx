import tw from "tailwind-styled-components"

interface UserProps{
    $byUser: number
}

export const Container = tw.div`w-full h-full flex flex-col items-center`
export const FlexWrap = tw.div`flex
mobile:flex-col`

export const ContentsWrap = tw.div`flex flex-col w-full space-y-3`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-0 mobile:h-screen`

export const MsgWrap = tw.div`flex flex-col w-full rounded-2xl bg-white h-auto shadow-md border p-2
mobile:flex mobile:border-none mobile:shadow-none`

export const ChatWrap = tw.div<UserProps>`flex my-4
${(p) => (p.$byUser === 1 ? "flex-row-reverse" : "")}`

export const Pic = tw.div`w-10 h-10 bg-gray-30 mx-4 mobile:w-12 mobile:h-12`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const MsgInfoWrap = tw.div`flex flex-col flex-1 max-w-[60%] w-auto`

export const Name = tw.p<UserProps>`font-medium text-sm
${(p) => (p.$byUser === 1 ? "text-end" : "")}
mobile:text-xs`

export const TextWrap = tw.div<UserProps>`bg-main mt-2 p-4 rounded-xl whitespace-pre-line
${(p) => (p.$byUser === 1 ? "bg-gray-100" : "text-white")}`
export const Text = tw.p`text-sm 
mobile:text-sm`

export const TimeWrap = tw.div`flex-col text-end mt-auto ml-2 mr-4`
export const Time = tw.p`text-xs
mobile:text-xs`

export const AddTextWrap = tw.div`p-3 border-t mt-5 bg-white
mobile:fixed mobile:bottom-0 mobile:w-full`

export const AddTextField = tw.textarea`min-h-12 max-h-36 py-3 ps-4 pe-20 block border w-full 
outline-main rounded-lg text-sm resize-none overflow-y-hidden`

export const ListWrap = tw.div`h-screen overflow-y-auto`
