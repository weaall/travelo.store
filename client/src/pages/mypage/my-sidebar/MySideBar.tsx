import { useLocation, useNavigate } from "react-router-dom";
import * as tw from "./MySideBar.styles";

export default function MySideBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const myPageList = [
        { src: require("../../../assets/drawer/mypage.svg").default, label: "내정보", nav: "" },
        { src: require("../../../assets/drawer/booking.svg").default, label: "예약확인", nav: "/booking" },
        { src: require("../../../assets/drawer/review.svg").default, label: "이용후기", nav: "/review" },
        { src: require("../../../assets/drawer/message.svg").default, label: "메세지", nav: "/message" }
    ];

    const hotelMgmtList = [
        { src: require("../../../assets/drawer/hotel_add.svg").default, label: "숙소등록", nav: "/hotelreg" },
        { src: require("../../../assets/drawer/hotel_mgmt.svg").default, label: "숙소관리", nav: "/hotel" },
    ];

    const isActive = (nav: string) => location.pathname === `/me${nav}`;

    return (
        <tw.Container>
            <tw.MenuWrap>
                <tw.MenuLabel>마이페이지</tw.MenuLabel>
                {myPageList.map((item, index) => (
                    <tw.ListWrap key={index} $isActive={isActive(item.nav) ? 'active' : ''} onClick={()=>{navigate(`/me${item.nav}`)}}>
                        <tw.SvgWrap>
                            <tw.Svg alt="" src={item.src} />
                        </tw.SvgWrap>
                        <tw.Label>{item.label}</tw.Label>
                    </tw.ListWrap>
                ))}
                <tw.MenuLabel>숙소관리</tw.MenuLabel>
                {hotelMgmtList.map((item, index) => (
                    <tw.ListWrap key={index} $isActive={isActive(item.nav) ? 'active' : ''} onClick={()=>{navigate(`/me${item.nav}`)}}>
                        <tw.SvgWrap>
                            <tw.Svg alt="" src={item.src} />
                        </tw.SvgWrap>
                        <tw.Label>{item.label}</tw.Label>
                    </tw.ListWrap>
                ))}
            </tw.MenuWrap>
        </tw.Container>
    );
}