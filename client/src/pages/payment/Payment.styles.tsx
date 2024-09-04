import tw from "tailwind-styled-components"

interface UnderTagProps {
    $validator: boolean
}

interface ValidatorBtnProps {
    $validator: boolean
}

export const Container = tw.div`flex flex-col items-center`
export const ContentsFlex = tw.div`h-auto w-auto flex flex-wrap items-center content-center`

export const MainContainer = tw.div`w-full h-full flex py-3
mobile:flex-col-reverse mobile:gap-2`
export const LeftWrap = tw.div`flex flex-col gap-2 w-3/5
mobile:w-full`
export const RightWrap = tw.div`flex flex-col gap-2 w-2/5
mobile:w-full`

export const Img = tw.img`w-full h-full object-cover rounded-l-xl
mobile:rounded-xl`
export const UnRegWrap = tw.div`flex h-full justify-center items-center text-2xl font-bold`

export const Label = tw.p`text-xl font-semibold mb-4`

export const OuterWrap = tw.div`flex flex-col border mx-1 p-4 gap-2`
export const HotelInfoWrap = tw.div`space-y-1`
export const HotelTitle = tw.p`text-base font-medium truncate
mobile:text-lg`
export const AddressWrap = tw.div`flex items-start`
export const AddressSVG = tw.img`w-2.5 mt-1 mr-1`
export const HotelAddress = tw.p`text-gray-400 text-xs hover:cursor-pointer text-main pb-3`

export const RoomWrap = tw.div`w-full rounded-2xl bg-white shadow-md h-36
mobile:flex mobile:flex-col mobile:h-auto`
export const Pic = tw.div`w-4/12 h-36 bg-gray-30
mobile:h-40 mobile:w-full`
export const RoomInfoWrap = tw.div`flex flex-col w-8/12 py-2 
mobile:w-full`
export const RoomInfo = tw.div`flex flex-col relative px-5 py-2 space-y-1
mobile:flex-row`
export const InfoWrap = tw.div`space-y-1
mobile:w-3/5`
export const RoomName = tw.h2`text-base font-medium truncate
mobile:text-sm`
export const RoomLabel = tw.p`text-sm text-gray`
export const RoomText = tw.p`text-xs text-gray-400
mobile:text-xs`

export const PriceWrap = tw.div`flex flex-col mx-1 border p-5`
export const PriceRow = tw.div`flex justify-between py-1`
export const PriceLabel = tw.p`text-sm text-gray-600`
export const TotalPriceRow = tw.div`flex justify-between border-t mt-3 pt-3`
export const TotalLabel = tw.p`text-lg font-medium`
export const TotalPrice = tw.p`text-lg font-semibold`

export const UserWrap = tw.div`flex flex-col mx-1 border p-5`
export const LabelWrap = tw.div`flex justify-between`
export const UserInfoWrap = tw.div`flex items-center`
export const InfoLabel = tw.label`font-medium text-sm`
export const UserLabel = tw.p<UnderTagProps>`text-sm font-medium mt-3
after:content-['*'] after:text-red-500 after:px-1
${(p) => (p.$validator ? "text-black" : "text-red-400")}`;
export const UserInput = tw.input<UnderTagProps>`text-sm w-full h-10 outline-none border-b border-gray-200 placeholder-gray-200
focus:border-b-2 focus:placeholder-transparent disabled:bg-white disabled:text-gray-300
${(p) => (p.$validator ? "focus:border-black" : "border-red-400 focus:border-b-1")}`;
export const UnderTag = tw.p<UnderTagProps>`text-xs font-normal h-[16px]
${(p) => (p.$validator ? "text-blue-500" : "text-red-400")}`

export const PolicyWrap = tw.div`flex flex-col mx-1 border p-5`
export const PolicyCheck = tw.input`ml-2 w-5 h-5 cursor-pointer accent-main`
export const PolicyTextMain = tw.p`ml-2 text-base`
export const PolicyText = tw.p`pl-1 text-sm text-gray-500`

export const PaymentWrap = tw.div`flex flex-col mx-1 border p-5`

export const PaymentBtn = tw.button<ValidatorBtnProps>`mx-1 text-lg font-medium px-5 h-12 rounded-xl bg-black text-white
mobile:hidden
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] mobile:hover:bg-black" : "bg-gray-200")}`

export const PaymentBtnMobile = tw.button<ValidatorBtnProps>`mx-1 text-lg font-medium px-5 h-12 rounded-xl bg-black text-white hidden
mobile:block
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] mobile:hover:bg-black" : "bg-gray-200")}`

