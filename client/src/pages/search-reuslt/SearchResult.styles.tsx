import tw from "tailwind-styled-components"

interface SortProps{
    $active: boolean
}

export const Container = tw.div`flex flex-col items-center`

export const ContentsFlex = tw.div`h-auto w-auto flex items-center`

export const MainContainer = tw.div`w-full h-full pb-10 px-6 mobile:px-0`

export const SearchWrap = tw.div`sticky top-0 z-10`;

export const SortWrap = tw.div`flex flex-col text-sm items-end my-2 relative mr-2 mobile:mb-4 mobile:text-base`
export const SortNowBtn = tw.button`flex text-end w-auto py-1`
export const SortSvg = tw.img`ml-1 mt-[1.5px] w-5 mobile:w-[22px] mobile:mt-[2px]`
export const SortDrawer = tw.div<SortProps>`absolute top-8 z-10 bg-white h-auto w-36 flex flex-col border rounded-xl 
shadow-md hover:shadow-xl mobile:w-40
${(p) => (p.$active ? "block" : "hidden")}`;
export const SortBtn = tw.button<SortProps>`h-full w-full py-2.5 px-4 flex justify-between
hover:bg-gray-100/[0.8] mobile:hover:bg-main
${(p) => (p.$active ? "font-bold" : "")}`;

export const HotelList = tw.div`flex flex-col gap-6
mobile:px-2`

export const NoHotelWrap = tw.div`w-full flex flex-col justify-center items-center space-y-10 py-16`
export const NoHotelText = tw.p`text-lg font-medium`
export const AddHotelBtn = tw.button`mt-2 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`

export const HotelWrapLoading = tw.div`h-60 mobile:h-[400px] rounded-2xl shadow-md
bg-gradient-to-r from-darkGray via-midGray to-lightGray bg-300% animate-gradient`

export const HotelWrap = tw.div`flex w-auto rounded-2xl bg-white shadow-md hover:shadow-xl
mobile:flex-col mobile:h-auto`
export const HotelPic = tw.div`w-4/12 h-60 bg-gray-30
mobile:h-40 mobile:w-full`

export const HotelInfoWrap = tw.div`flex flex-col w-8/12 py-2 hover:cursor-pointer
mobile:w-full`
export const HotelInfo = tw.div`relative px-5 py-2 space-y-1
mobile:flex-row`
export const HotelTitleWrap = tw.div`flex justify-between`
export const HotelNameWrap = tw.div`mobile:w-[75%] flex flex-col space-y-1 w-[75%]`
export const HotelName = tw.h2`text-xl font-bold`
export const HotelAddress = tw.p`text-xs text-main pl-1 truncate`
export const AddressSVG = tw.img`w-3`
export const RatingWrap = tw.div`flex items-center ml-4`
export const RatingLabel = tw.p`text-xl font-bold text-white bg-black rounded-xl px-3 py-1`

export const HotelP = tw.p`text-sm font-bold`
export const HotelComp = tw.p`text-xs`

export const HotelServWrap = tw.div`flex flex-col py-1 peer/serv`
export const HotelServList = tw.div`flex pt-1 space-x-2 truncate`
export const TooltipServ = tw.div`absolute flex flex-wrap top-4 mx-3 p-3 h-auto w-auto bg-black opacity-0 scale-0 rounded-xl
peer-hover/serv:opacity-100 peer-hover/serv:scale-100 
transition-opacity duration-300 mobile:hidden`

export const HotelFacilWrap = tw.div`flex flex-col py-1 peer/facil`
export const HotelFacilList = tw.div`flex pt-1 space-x-2 truncate`
export const TooltipFacil = tw.div`absolute flex flex-wrap top-10 mx-3 p-3 h-auto w-auto bg-black opacity-0 scale-0 rounded-xl
peer-hover/facil:opacity-100 peer-hover/facil:scale-100 
transition-opacity duration-300 mobile:hidden`

export const ToolTipText = tw.p`px-2 text-white text-sm font-medium`

export const PriceWrap = tw.div`flex flex-col text-end`
export const TotalLabel = tw.p`text-xs text-gray-400`
export const TotalPrice = tw.p`text-xl font-bold`