import tw from "tailwind-styled-components"



export const Container = tw.div`w-full h-full flex flex-col items-center rounded-[32px] bg-gray-100 py-10`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2 px-6 py-6 border-b`
export const ContentsFlex = tw.div`w-full flex items-center justify-between`
export const HalfCol = tw.div`w-[50%] flex flex-col`
export const HalfFlex = tw.div`w-[50%] flex justify-end`

export const MainContainer = tw.div`w-full`

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

export const HotelWrap = tw.div`m-4 rounded-2xl h-40 bg-white shadow-md flex group cursor-pointer`
export const HotelPic = tw.div`w-5/12 rounded-l-2xl rounded-tl-2xl
border-b-[10rem] border-r-[40px] border-b-gray-400 border-r-gray-400 border-r-transparent group-hover:scale-[103%] cursor-pointer`
export const HotelInfo = tw.div`w-7/12 px-5 py-3 space-y-1`
export const HotelName = tw.h2`text-xl font-bold`
export const HotelAddress = tw.p`text-xs`
export const HotelText = tw.p`text-xs `
export const HotelServWrap = tw.div`flex space-x-6 truncate`
export const HotelFacilWrap = tw.div`flex space-x-6 truncate`