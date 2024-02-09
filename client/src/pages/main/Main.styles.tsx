import tw from "tailwind-styled-components"

export const Container = tw.div`mt-24 h-full flex flex-col items-center rounded-[32px] bg-gray-100 py-10`
export const ContentsWrap = tw.div``

export const MainContainer = tw.div` w-full`

export const SelectContainer = tw.div`mx-10 rounded-md h-24 bg-white shadow-md`
export const SelectContainerCell1 = tw.div`flex items-center border-b border-gray-300 h-1/2`
export const SelectContainerCell2 = tw.div`flex h-1/2`
export const SelectRegion = tw.div `w-full mx-4 flex ml-2`
export const SelectStartDate = tw.div`w-1/2 h-full border-r border-gray-300 ml-2 flex items-center`
export const SelectEndDate = tw.div`w-1/2 h-full ml-2 flex items-center`

export const SortContainer = tw.div`my-10 mx-[10%] rounded-md h-14 bg-white flex text-xl font-semibold cursor-pointer text-center items-center`
export const SortBtn = tw.button` w-1/2 h-full border-r border-gray-300`
export const FilterBtn = tw.button` w-1/2 h-full`

export const HotelList = tw.div``

export const HotelContainer = tw.div`m-4 rounded-2xl h-40 bg-white shadow-md flex group cursor-pointer`
export const HotelPic = tw.div`w-5/12 rounded-l-2xl rounded-tl-2xl
border-b-[10rem] border-r-[40px] border-b-gray-400 border-r-gray-400 border-r-transparent group-hover:scale-[103%] cursor-pointer`
export const HotelInfo = tw.div` m-auto text-center`
export const HotelName = tw.h2``
export const HotelLocate = tw.h3` m-0`
export const HotelMinPriceBox = tw.div` flex items-center relative`
export const HotelMinPrice = tw.p``
export const HotelBookingBtn = tw.button` ml-10 rounded-md h-10 w-32 border-none bg-blue-500 text-white cursor-pointer`
