import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import Cookies from "js-cookie"

import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom"
import UserMenu from "../usermenu/UserMenu"
import * as tw from "./Header.styles"

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [headerRender, setHeaderRender] = useRecoilState(HeaderRenderAtom);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isSignIn, setIsSignIn] = useState(false);

    const [isRoot, setIsRoot] = useState(false);

    useEffect(() => {
        setIsRoot(location.pathname === "/");
    }, [location.pathname]);

    const handleBackClick = () => {
        if (!isRoot) {
            navigate(-1);
        }
    };

    const checkSignInState = () => {
        const jwtToken = Cookies.get("jwt");
        if (jwtToken) {
            setIsSignIn(true);
        } else {
            setIsSignIn(false);
        }
    };

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const changeMenuState = () => {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
        } else {
            setIsMenuOpen(false);
        }
    };

    const navigateClick = (url: string) => {
        setHeaderRender((prevCount) => prevCount + 1);
        navigate(url);
    };

    useEffect(() => {
        checkSignInState();
        setIsMenuOpen(false);
    }, [headerRender]);

    useEffect(() => {
        checkSignInState();
        setIsMenuOpen(false);
    }, [location]);

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <UserMenu isMenuOpen={isMenuOpen} />
                <tw.NavWrap>
                    <tw.ActiveBtn onClick={handleBackClick}>
                        {isRoot ? (
                            <tw.GnbSvg alt="spinner" src={require("../../assets/svg/spinner.svg").default} />
                        ) : (
                            <tw.BackSvg alt="back" src={require("../../assets/svg/arrow_left_short.svg").default} />
                        )}
                    </tw.ActiveBtn>
                    <tw.NavHome onClick={() => navigateClick("/")}>Travel.io</tw.NavHome>
                    {isSignIn === false ? (
                        <>
                            <tw.SignInBtn onClick={() => navigateClick("/signin")}>로그인</tw.SignInBtn>
                        </>
                    ) : (
                        <>
                            <tw.SignInBtn onClick={changeMenuState}>
                                <tw.Svg alt="" src={require("../../assets/svg/list_icon.svg").default} />
                            </tw.SignInBtn>
                        </>
                    )}
                </tw.NavWrap>
            </tw.ContentsWrap>
        </tw.Container>
    );
}
