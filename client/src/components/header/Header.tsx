import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom";
import * as tw from "./Header.styles";
import { ModalPortal } from "../../hook/modal/ModalPortal";
import UserMenuModal from "../../hook/modal/usermenu/UserMenu.modal";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [headerRender, setHeaderRender] = useRecoilState(HeaderRenderAtom);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isRoot, setIsRoot] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const [isUserMenuModalOpen, setIsUserMenuModalOpen] = useState(false);
    const openUserMenuModal = () => {
        setIsUserMenuModalOpen(true);
    };
    const closeUserMenuModal = () => {
        setIsUserMenuModalOpen(false);
    };

    const navTitleMapping: { [key: string]: string } = {
        "/": "travelo.store",
        "/signin": "로그인",
        "/signup": "가입하기",
        "/hotel/mgmt/*": "숙소관리",
    };

    const getNavTitle = (path: string): string => {
        if (navTitleMapping[path]) {
            return navTitleMapping[path];
        }
        for (const key in navTitleMapping) {
            if (key.endsWith("*") && path.startsWith(key.slice(0, -1))) {
                return navTitleMapping[key];
            }
        }
        return "travelo.store";
    };

    const navTitle = useMemo(() => getNavTitle(location.pathname), [location.pathname]);

    const checkSignInState = () => {
        const jwtToken = Cookies.get("jwt");
        setIsSignIn(!!jwtToken);
    };

    const handleBackClick = () => {
        if (!isRoot) {
            navigate(-1);
        }
    };

    const navigateClick = (url: string) => {
        setHeaderRender((prevCount) => prevCount + 1);
        navigate(url);
    };

    useEffect(() => {
        setIsRoot(location.pathname === "/");
    }, [location.pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
        checkSignInState();
        setIsMenuOpen(false);
    }, [headerRender, location]);

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.NavWrap>
                    <tw.ActiveBtn onClick={handleBackClick}>
                        {isRoot ? null : <tw.BackSvg alt="back" src={require("../../assets/svg/arrow_left_short.svg").default} />}
                    </tw.ActiveBtn>
                    <tw.NavHome onClick={() => navigateClick("/")}>{navTitle}</tw.NavHome>
                    {!isSignIn ? (
                        <tw.SignInBtn onClick={() => navigateClick("/signin")}>로그인</tw.SignInBtn>
                    ) : (
                        <tw.SignInBtn onClick={openUserMenuModal}>
                            <tw.Svg alt="menu" src={require("../../assets/svg/list_icon.svg").default} />
                        </tw.SignInBtn>
                    )}
                </tw.NavWrap>
            </tw.ContentsWrap>

            {isUserMenuModalOpen && (
                <ModalPortal>
                    <UserMenuModal onClose={closeUserMenuModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
