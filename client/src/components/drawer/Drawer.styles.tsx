import tw from "tailwind-styled-components";

interface ActiveProps{
    $isActive: string;
}

export const Container = tw.div`min-w-[250px] sticky top-10
mobile:hidden`

export const MenuWrap = tw.div`w-auto h-auto bg-white p-4 space-y-2
flex flex-col rounded-3xl border-b shadow-lg`

export const MenuLabel = tw.label`px-3 pt-2 text-sm font-medium text-main`

export const ListWrap = tw.div<ActiveProps>`flex h-12 items-center rounded-xl cursor-pointer
hover:bg-gray-200/[0.8]
${(p) => (p.$isActive === 'active' ? 'bg-gray-100' : '')}`;
export const SvgWrap = tw.div`flex w-16 px-5`
export const Svg = tw.img``
export const Label = tw.p`font-semibold`