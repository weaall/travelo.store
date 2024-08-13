import tw from "tailwind-styled-components"

export const ReviewList = tw.div`flex gap-6 mx-6 px-4 py-6 border 
mobile:p-0 mobile:m-0 mobile:`
export const ReviewWrap = tw.div`flex flex-col min-w-1/3`
export const Rating = tw.span`text-3xl font-semibold pr-4 `
export const Review = tw.p`px-2 text-sm truncate-on-overflow`
export const Name = tw.p`text-end pt-4`
export const Date = tw.p`pb-1 text-gray-400 text-xs`

export const PaginationControls = tw.div`flex justify-between items-center mt-4`;
export const Button = tw.button`px-4 py-2 bg-gray-200 rounded disabled:opacity-50`;
export const PageIndicator = tw.span`text-sm`;