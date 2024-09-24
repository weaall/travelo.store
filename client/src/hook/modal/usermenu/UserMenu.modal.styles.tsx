import tw from "tailwind-styled-components";

interface ActiveProps {
    $isActive: string;
}

interface Closing {
    $isClosing: boolean;
}

export const Container = tw.div<Closing>`w-full h-full bg-zinc-400/[0.3] fixed top-0 z-50
backdrop-blur-sm
${(p) => (p.$isClosing ? "animate-closeBackdrop" : "animate-backdrop")}`
export const ModalContainer = tw.div`mx-auto h-full max-w-[840px] relative`
export const ModalWrap = tw.div<Closing>`w-[260px] mobile:w-full h-full flex flex-col rounded-l-lg
bg-white absolute top-0 right-0
 ${(p) => (p.$isClosing ? "animate-closeDrawer" : "animate-drawer")}`;

export const TitleWrap = tw.div`h-14`;

export const CloseBtn = tw.button`w-8 absolute top-4 right-4 group`;
export const CloseSVG = tw.img`h-full w-full group-hover-scale-105`;

export const SignOutBtn = tw.button`mx-4 py-2 px-4 border border-main rounded-xl
transition ease-in delay-50 hover:bg-main hover:text-white`

export const InputWrap = tw.div`flex flex-col text-left py-4`;

export const MenuWrap = tw.div`w-auto h-auto bg-white p-4 space-y-2
flex flex-col rounded-3xl`;

export const MenuLabel = tw.label`px-3 pt-2 text-sm font-medium text-main`;

export const ListWrap = tw.div<ActiveProps>`flex h-12 items-center rounded-xl cursor-pointer
hover:bg-gray-200/[0.8]
${(p) => (p.$isActive === "active" ? "bg-gray-100" : "")}`;
export const SvgWrap = tw.div`flex w-16 px-5`;
export const Svg = tw.img``;
export const Label = tw.p`font-semibold`;
