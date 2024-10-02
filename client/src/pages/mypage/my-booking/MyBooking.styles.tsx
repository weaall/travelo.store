import tw from "tailwind-styled-components"

interface StateProps{
    $state: number
}

export const Container = tw.div`w-full h-full flex flex-col items-center mb-10`
export const FlexWrap = tw.div`flex
mobile:flex-col`

export const TitleWrap = tw.div`flex items-center`
export const Title = tw.h3`my-4 text-2xl font-bold 
mobile:ml-4`

export const ContentsWrap = tw.div`flex flex-col w-full space-y-3`

export const MobileWrap = tw.div`flex flex-col w-full px-10
mobile:w-full mobile:px-2`

export const DateTitleLoading = tw.p`h-6 w-24 mt-4 rounded shadow-md
mobile:ml-4
bg-gradient-to-r from-darkGray via-midGray to-lightGray bg-300% animate-gradient`
export const DateTitle = tw.p`text-sm font-medium text-gray-400 pt-4
mobile:ml-4`

export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`

export const NoBookingWrap = tw.div`w-full flex flex-col justify-center items-center space-y-10 py-16`
export const NoBookingText = tw.p`text-lg font-medium`
export const GoTripBtn = tw.button`mt-2 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`

export const BookingOuterWrap =tw.div`space-y-3`

export const BookingWrapLoading = tw.div`h-64 mobile:h-[430px] flex flex-col w-full rounded-2xl shadow-md
bg-gradient-to-r from-darkGray via-midGray to-lightGray bg-300% animate-gradient`
export const BookingWrap = tw.div`flex flex-col w-full rounded-2xl bg-white h-auto shadow-md border
mobile:flex mobile:flex-col mobile:h-auto`

export const BookingIdWrap = tw.div`flex mx-4 my-4 justify-between`
export const BookingId = tw.p`text-sm font-semibold`
export const BookingStatus = tw.p<StateProps>`text-xs font-medium bg-green-200 text-lime-950 py-1 px-2 rounded-lg
  ${(p) =>
      p.$state === 0
          ? "bg-red-500 text-white"
          : p.$state === 1
          ? "bg-green-500 text-white"
          : p.$state === 2
          ? "text-main"
          : p.$state === 3
          ? "bg-red-500 text-white"
          : p.$state === 4
          ? "text-red-500"
          : ""}    `;

export const Pic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const HotelInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1 w-8/12
mobile:w-full`
export const HotelTitle = tw.p`text-base font-medium truncate
mobile:text-lg`
export const AddressWrap = tw.div`flex items-start`;
export const HotelAddress = tw.p`text-main text-xs pl-1 hover:cursor-pointer`;
export const AddressSVG = tw.img`w-3 mt-0.5`;

export const MgmtBtnWrap = tw.div`text-end px-4 pt-2 pb-4`
export const MgmtBtn = tw.button`mt-2 text-base font-medium px-5 py-2 rounded-xl bg-black text-white hover:bg-black/[0.8]
mobile:hover:bg-black`

export const CheckWrap = tw.div`flex w-full border-y`
export const CheckInWrap = tw.div`flex flex-col w-[50%] my-3 border-r text-left space-y-1`
export const CheckOutWrap = tw.div`flex flex-col w-[50%] my-3 text-right space-y-1`
export const CheckLabel = tw.label`text-sm text-gray-400 text-xs
mobile:text-xs`
export const CheckText = tw.p`text-xs`