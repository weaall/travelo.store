import tw from "tailwind-styled-components"

export const ReviewList = tw.div`flex gap-6 mx-6 px-4 py-6 border 
mobile:p-0 mobile:m-0 mobile:`
export const ReviewWrap = tw.div`flex flex-col min-w-1/3`
export const Rating = tw.span`text-3xl font-semibold pr-4 `
export const Review = tw.p`px-2 text-sm truncate-on-overflow`
export const Name = tw.p`text-end pt-4`