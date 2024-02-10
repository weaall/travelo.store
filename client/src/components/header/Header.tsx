import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom"
import { useRecoilState } from "recoil"
import * as tw from "./Header.styles"

export default function Header() {
    const navigate = useNavigate()

    const [headerRender, setHeaderRender] = useRecoilState(HeaderRenderAtom)
    const [isSignIn, setIsSignIn] = useState(false)

    const checkSignInState = () => {
        const jwtToken = Cookies.get("jwt")
        if (jwtToken) {
            setIsSignIn(true)
        } else {
            setIsSignIn(false)
        }
    }

    const logoutClick = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            Cookies.remove("jwt")
            setHeaderRender((prevCount) => prevCount + 1)
            navigate("/main")
        } else {
        }
    }

    useEffect(() => {
        checkSignInState()
    }, [headerRender])

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.NavWrap>
                    <tw.ActiveBtn>
                        <tw.GnbSvg alt="" src={require("../../assets/svg/spinner.svg").default}></tw.GnbSvg>
                    </tw.ActiveBtn>
                    <tw.NavHome onClick={() => navigate("/main")}>weaall Dev</tw.NavHome>
                    {isSignIn === false ? (
                        <>
                            <tw.SignInBtn onClick={() => navigate("/signin")}>로그인</tw.SignInBtn>
                        </>
                    ) : (
                        <>
                            <tw.SignInBtn onClick={() => logoutClick()}>로그아웃</tw.SignInBtn>
                        </>
                    )}
                </tw.NavWrap>
            </tw.ContentsWrap>
        </tw.Container>
    )
}
