import tw from "tailwind-styled-components"

interface ColorProps{
    $color: string
}

export const Container = tw.div`w-full h-full flex flex-col items-center`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold
mobile:ml-4`
export const Social = tw.text<ColorProps>`px-3 py-1 font-bold rounded-xl text-sm mx-6
${(p) => (p.$color = "kakao" ? "bg-kakao text-kakao-text" : "naver" ? "bg-green-200" : "bg-white")}`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const InputWrap = tw.div`flex flex-col text-left w-full py-6 px-12`
export const UpperTag = tw.label`text-base font-bold py-0 my-0
after:content-['*'] after:text-red-500 after:px-1`
export const Input = tw.input`font-medium outline-none w-full h-10 px-6 rounded-lg bg-gray-100 my-1`;