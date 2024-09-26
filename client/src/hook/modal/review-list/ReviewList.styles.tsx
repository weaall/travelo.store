import tw from "tailwind-styled-components"

interface Closing {
    $isClosing: boolean;
}

export const Container = tw.div<Closing>`w-full h-full bg-zinc-400/[0.3] fixed top-0 z-50
${(p) => (p.$isClosing ? "animate-closeBackdrop" : "animate-backdrop")}`

export const ModalWrap = tw.div<Closing>`max-w-[28rem] w-[80%] h-[34rem] flex flex-col rounded-[16px] p-6
bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
${(p) => (p.$isClosing ? "animate-closeModal mobile:animate-closeMobileModal" : "animate-modal mobile:animate-mobileModal")}
mobile:w-full mobile:h-full mobile:rounded-t-2xl mobile:mt-6`

export const TitleWrap = tw.div`h-[10%]`

export const Title = tw.h2`font-bold text-2xl text-center`

export const CloseBtn = tw.button`w-10 absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-xl`
export const CloseSVG = tw.img`h-full w-full`

export const ContentsFlex = tw.div`w-full flex`

export const InputWrap = tw.div`flex flex-col text-left h-[90%] px-4 pt-4 overflow-y-auto`
export const UpperTag = tw.label`text-ms font-bold py-0 my-2`

export const ReviewList = tw.div`grid grid-cols-1 gap-4 overflow-y-auto`
export const ReviewWrap = tw.div`flex flex-col w-full bg-gray-100/[0.5] p-3 rounded-xl`
export const Rating = tw.span`text-3xl font-semibold pr-4`
export const Review = tw.p`px-2 text-sm truncate-on-overflow`
export const Name = tw.p`text-end pt-4 text-xs`
export const Date = tw.p`pb-1 text-gray-400 text-xs`

export const PaginationControls = tw.div`flex justify-between items-center mt-4`;
export const Button = tw.button`px-4 py-2 bg-gray-200 rounded disabled:opacity-50`;
export const PageIndicator = tw.span`text-sm`;

export const ButtonWrap = tw.div`flex justify-between mt-4 items-center`
export const PageNav = tw.span`text-gray-500 text-sm`
export const ImgButton = tw.button`bg-opacity-40 w-10 h-10 rounded-2xl px-2 bg-gray-500`;
export const Svg = tw.img`w-full h-full `