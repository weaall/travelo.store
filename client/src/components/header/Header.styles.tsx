import tw from "tailwind-styled-components";

interface MenuOpenProps {
    $validator: boolean
}

export const Container = tw.div`w-full border-b`
export const ContentsWrap = tw.div`m-auto max-w-[840px] h-16 bg-white/[0.7]`

export const NavWrap = tw.div`flex px-10 h-full w-full items-center justify-between`
export const NavHome = tw.button`text-xl`

export const MenuContainer = tw.div``
export const ActiveBtn = tw.button`w-16 h-12`
export const SignInBtn = tw.button`w-16 h-12`

export const GnbBtn = tw.button`w-20 h-8`
export const GnbSvg = tw.img`w-full h-full`
