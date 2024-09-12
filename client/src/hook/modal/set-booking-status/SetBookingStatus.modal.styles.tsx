import tw from "tailwind-styled-components";

interface RegBtnProps {
    $validator: boolean;
}

interface Closing {
    $isClosing: boolean;
}

export const Container = tw.div<Closing>`
  w-full h-full inset-0 bg-black bg-opacity-30 fixed top-0 z-100
  backdrop-blur-sm
  ${(p) => (p.$isClosing ? "animate-closeBackdrop" : "animate-backdrop")}
`;

export const ModalWrap = tw.div<Closing>`
  max-w-[28rem] w-[20rem] h-auto flex flex-col rounded-[16px] p-6
  bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
  ${(p) => (p.$isClosing ? "animate-closeModal" : "animate-modal")}
`;

export const TitleWrap = tw.div`h-[10%]`;

export const Title = tw.h2`font-bold text-2xl text-center`;

export const CloseBtn = tw.button`w-8 absolute top-4 right-4 group`;
export const CloseSVG = tw.img`h-full w-full group-hover-scale-105`;

export const ContentsFlex = tw.div`w-full flex`;

export const SubTitleWrap = tw.div`w-full flex justify-between`;
export const BookingId = tw.h3`py-4 text-sm text-right mobile:text-sm`;
export const Booking = tw.h3`py-4 text-sm text-right mobile:text-sm`;

export const InputWrap = tw.div`flex flex-col text-left pb-10 px-4 overflow-y-auto`;
export const UpperTag = tw.label`text-ms font-bold py-0 my-2`;

export const BtnWrap = tw.div`flex space-x-2 w-full`;
export const ConfirmBtn = tw.button<RegBtnProps>` 
w-[50%] mx-1 text-sm font-medium px-5 py-3 rounded-xl bg-black text-white
mobile:hover:bg-black
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] cursor-pointer" : "bg-gray-200")}`;
export const MsgBtn = tw.button` 
w-[50%] mx-1 text-sm font-medium px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-100 border border-gray-100
mobile:hover:bg-black`;

export const RegBtn = tw.button<RegBtnProps>` 
w-full mx-1 text-lg font-medium px-5 py-3 rounded-xl bg-black text-white
mobile:hover:bg-black
${(p) => (p.$validator ? "bg-black hover:bg-black/[0.8] cursor-pointer" : "bg-gray-200")}`;

export const SelectFilter = tw.select`border rounded px-1 py-1 text-xs`;
export const Option = tw.option``;

export const BlockLabel = tw.h2`text-xs pt-4 text-center px-2`;
