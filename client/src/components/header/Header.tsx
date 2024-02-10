import { useNavigate } from "react-router-dom"
import * as tw from "./Header.styles"

export default function Header() {
    const navigate = useNavigate();
    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.NavWrap>
                    <tw.ActiveBtn>
                        <tw.GnbSvg alt="" src={require("../../assets/svg/spinner.svg").default}></tw.GnbSvg>
                    </tw.ActiveBtn>
                    <tw.NavHome onClick={()=>navigate("/main")}>weaall Dev</tw.NavHome>
                    <tw.SignInBtn onClick={()=>navigate("/signin")}>로그인</tw.SignInBtn>
                </tw.NavWrap>
            </tw.ContentsWrap>
        </tw.Container>
    )
}
