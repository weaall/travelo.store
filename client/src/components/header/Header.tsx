import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom";
import * as tw from "./Header.styles";
import { ModalPortal } from "../../hook/modal/ModalPortal";
import UserMenuModal from "../../hook/modal/usermenu/UserMenu.modal";
import HotelMgmtDrawerModal from "../../hook/modal/hotel-mgmt-drawer/HotelMgmtDrawer.modal";

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

    const [isHotelMgmtModalOpen, setIsHotelMgmtModalOpen] = useState(false);
    const openHotelMgmtModal = () => {
        setIsHotelMgmtModalOpen(true);
    };
    const closeHotelMgmtModal = () => {
        setIsHotelMgmtModalOpen(false);
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

    const isHotelMgmtRoute = location.pathname.startsWith("/hotel/mgmt/");

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMenuClick = () => {
        if (!isSignIn) return navigateClick("/signin");

        if (isMobile) {
            if (isHotelMgmtRoute) {
                openHotelMgmtModal();
            } else {
                openUserMenuModal();
            }
        } else {
            openUserMenuModal();
        }
    };

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
                    <tw.SignInBtn onClick={handleMenuClick}>
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

            {isHotelMgmtModalOpen && (
                <ModalPortal>
                    <HotelMgmtDrawerModal onClose={closeHotelMgmtModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
