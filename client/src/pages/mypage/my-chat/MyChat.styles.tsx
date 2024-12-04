import tw from "tailwind-styled-components"

interface UserProps{
    $byUser: number
}

export const Container = tw.div`w-full h-full flex flex-col items-center mt-10 
mobile:mt-0`

export const ContentsWrap = tw.div`flex flex-col w-full space-y-3 px-10
mobile:w-full mobile:px-0`

export const MsgWrap = tw.div`flex flex-col w-full rounded-2xl bg-white h-auto shadow-md border min-h-screen-16 max-h-screen-32
mobile:flex mobile:border-none mobile:shadow-none`

export const ChatWrapLoading = tw.div`flex my-4 w-fit`
export const PicLoading = tw.div`w-10 h-10 bg-gray-30 mx-4 mobile:mx-2 rounded-full
bg-gradient-to-r from-darkGray via-midGray to-lightGray bg-300% animate-gradient`
export const MsgInfoWrapLoading = tw.div`flex flex-col max-w-[55%]`
export const NameLoading = tw.div`w-20 h-5 my-1 rounded-[4px]
bg-gradient-to-r from-darkGray via-midGray to-lightGray bg-300% animate-gradient`
export const TextWrapLoading = tw.div`bg-main/[0.9] mt-2 p-4 rounded-xl whitespace-pre-line w-fit inline-block text-white
bg-gradient-to-r from-darkGray via-midGray to-lightGray bg-300% animate-gradient h-80 w-52`
export const TimeWrapLoading = tw.div`flex-col text-end mt-auto ml-2 mr-4
bg-gradient-to-r from-darkGray via-midGray to-lightGray bg-300% animate-gradient`

export const ChatWrap = tw.div<UserProps>`flex my-4
${(p) => (p.$byUser === 1 ? "flex-row-reverse" : "w-fit")}`

export const Pic = tw.div`w-10 h-10 bg-gray-30 mx-4 mobile:mx-2`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const MsgInfoWrap = tw.div`flex flex-col max-w-[55%] `

export const Name = tw.p<UserProps>`font-medium text-sm
${(p) => (p.$byUser === 1 ? "text-end" : "")}
mobile:text-xs`

export const TextWrap = tw.div<UserProps>`bg-main/[0.9] mt-2 p-4 rounded-xl whitespace-pre-line w-fit inline-block
${(p) => (p.$byUser === 1 ? "bg-gray-100 " : "text-white")}`
export const Text = tw.p`text-sm
mobile:text-sm`

export const TimeWrap = tw.div`flex-col text-end mt-auto ml-2 mr-4`
export const Time = tw.p`text-xs
mobile:text-xxs`

export const AddTextWrap = tw.div`py-3 px-3 border-t bg-white rounded-b-xl
mobile:fixed mobile:bottom-0 mobile:w-full `
export const AddTextBox = tw.div`relative max-w-full`
export const AddTextField = tw.textarea`min-h-12 max-h-36 py-3 ps-4 pe-20 block border w-full
outline-main rounded-lg text-sm resize-none overflow-y-hidden`
export const AddTextBtnWrap = tw.div`absolute bottom-1.5 end-3 z-10`
export const AddTextBtn = tw.button`mt-1.5 py-1.5 px-3 inline-flex flex-shrink-0 justify-center items-center rounded-xl bg-main hover:bg-main/[0.8]`
export const AddTextSvg = tw.img`w-6`
export const AddTextNum = tw.p`text-end px-3 text-xs text-gray-500`

export const ListWrap = tw.div`overflow-y-auto pb-2 min-h-screen-16`
