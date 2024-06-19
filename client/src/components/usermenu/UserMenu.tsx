import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

import { HeaderRenderAtom } from "../../recoil/HeaderRender.Atom";
import * as tw from "./UserMenu.styles";

interface UserMenuProps {
    isMenuOpen: boolean;
}

export default function UserMenu({ isMenuOpen }: UserMenuProps) {
    const [headerRender, setHeaderRender] = useRecoilState(HeaderRenderAtom);
    const navigate = useNavigate();

    const logoutClick = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            Cookies.remove("jwt");
            setHeaderRender((prevCount) => prevCount + 1);
            navigate("/main");
        } else {
        }
    };

    const navigateClick = (url: string) => {
        setHeaderRender((prevCount) => prevCount + 1);
        navigate(`/${url}`);
    };

    return (
        <tw.Container>
            <tw.MenuWrap $validator={isMenuOpen}>
                <tw.MenuNav>
                    <tw.MenuLabelWrap>
                        <tw.MenuLabel>마이페이지</tw.MenuLabel>
                        <tw.SignOutBtn onClick={logoutClick}>로그아웃</tw.SignOutBtn>
                    </tw.MenuLabelWrap>
                    <tw.MenuUl>
                        <tw.MenuLi>
                            <tw.MenuA onClick={()=>navigate("/me")}>내정보</tw.MenuA>
                        </tw.MenuLi>
                        <tw.MenuLi>
                            <tw.MenuA onClick={()=>navigate("/me/booking")}>예약확인</tw.MenuA>
                        </tw.MenuLi>
                        <tw.MenuLi>
                            <tw.MenuA>이용후기</tw.MenuA>
                        </tw.MenuLi>
                    </tw.MenuUl>
                    <tw.MenuLabel>숙소관리</tw.MenuLabel>
                    <tw.MenuUl>
                        <tw.MenuLi>
                            <tw.MenuA onClick={() => navigateClick("me/hotelreg")}>숙소등록</tw.MenuA>
                        </tw.MenuLi>
                        <tw.MenuLi>
                            <tw.MenuA onClick={() => navigateClick("me/hotel")}>숙소관리</tw.MenuA>
                        </tw.MenuLi>
                    </tw.MenuUl>
                </tw.MenuNav>
            </tw.MenuWrap>
        </tw.Container>
    );
}
