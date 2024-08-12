import tw from "tailwind-styled-components"

interface RegBtnProps {
    $validator: boolean
}

interface LengthProps {
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

export const SubTitleWrap = tw.div`w-full flex justify-between`
export const SubTitle = tw.h3`w-[50%] py-4 text-base font-semibold mobile:text-base`
export const BookingId = tw.h3`w-[50%] py-4 text-sm text-right mobile:text-sm`

export const InputWrap = tw.div`flex flex-col text-left h-[90%] px-4 overflow-y-auto`
export const UpperTag = tw.label`text-ms font-bold py-0 my-2`

export const ReviewWrap = tw.div``
export const RatingWrap = tw.div`flex items-center justify-between`
export const Rating = tw.h2`text-4xl font-semibold`
export const Name = tw.p``
export const Date = tw.p``
export const Review = tw.p`text-center p-4`
