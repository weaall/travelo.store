import tw from "tailwind-styled-components";

export const Container = tw.div`w-full`

export const ContentsWrap = tw.div`w-full flex flex-col space-y-2`
export const ContentsFlex = tw.div`w-full flex items-center justify-between`
export const HalfFlex = tw.div`w-[50%] flex justify-end`

export const MobileWrap = tw.div`flex flex-col w-full px-10 mb-10
mobile:w-full mobile:px-4`

export const TitleWrap = tw.div`flex items-center w-[50%]`
export const Title = tw.h3`text-2xl font-bold my-4
mobile:ml-2`

export const Btn = tw.button`p-3 font-bold hover:text-main`

export const NoRoomWrap = tw.div`w-full flex flex-col justify-center items-center space-y-10 py-16`
export const NoRoomText = tw.p`text-lg font-medium`
export const AddRoomBtn = tw.button`mt-2 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`

export const RoomList = tw.div`w-full flex flex-col space-y-3 items-center`

export const RoomWrap = tw.div`flex flex-col w-full rounded-2xl bg-white h-auto shadow-md border
mobile:flex mobile:flex-col mobile:h-auto`

export const UpperWrap = tw.div`flex mx-4 my-4 justify-between`
export const RoomName = tw.p`text-base font-semibold`

export const MiddleWrap = tw.div`flex
mobile:flex-col`
export const Pic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`
export const HotelInfoWrap = tw.div`flex flex-col relative px-5 py-2 space-y-1 w-8/12
mobile:w-full`
export const RoomText = tw.p`text-sm font-medium`

export const MgmtBtnWrap = tw.div`text-end px-4 pt-2 pb-4 space-x-4`
export const MgmtBtn = tw.button`mt-2 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`
