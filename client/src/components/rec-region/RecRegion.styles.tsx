import tw from "tailwind-styled-components";

export const Container = tw.div``;

export const NoCookieWrap = tw.div`flex w-full justify-center items-center min-h-[112px]`;

export const ContentsWrap = tw.div`px-6 space-y-2`;
export const Lable = tw.p`text-sm font-semibold`;
export const RegionList = tw.div`flex w-full space-x-4 overflow-x-auto overflow-x-hidden
mobile:flex-wrap mobile:space-x-0`;

export const RegionWrap = tw.div`relative rounded-full cursor-pointer
mobile:w-1/3 mobile:my-1 mobile:px-1`;

export const ImgWrap = tw.div`w-28 h-28 opacity-60 pointer-events-none select-none 
mobile:w-full mobile:h-14`;

export const RegionLabel = tw.p`absolute text-black font-bold top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-2 pointer-events-none select-none
text-shadow-custom`;
