import tw from "tailwind-styled-components";

interface MenuOpenProps {
    $validator: boolean
}

export const Container = tw.div``
export const ContentsWrap = tw.div`mt-2 fixed w-full max-w-[640px] h-20 bg-white/[0.7] rounded-3xl border shadow-sm`

export const NavWrap = tw.div`flex px-10 h-full w-full items-center justify-between`
export const NavHome = tw.button`text-xl`

export const MenuContainer = tw.div``
export const ActiveBtn = tw.button`w-20 h-12`
export const SignInBtn = tw.button`w-20 h-12`

export const GnbBtn = tw.button`w-20 h-8`
export const GnbSvg = tw.img`w-full h-full`
