import { useLocation, useNavigate } from "react-router-dom";
import * as tw from "./MgmtSideBar.styles";
import { encrypt } from "../../../utils/cryptoJs";

export default function MgmtSideBar({ hotel_id }: { hotel_id: string | undefined }) {
    const navigate = useNavigate();
    const location = useLocation();
    const hotelId = encrypt(hotel_id || "")

    const mgmtList = [
        { src: require("../../../assets/drawer/hotel_mgmt.svg").default, label: "숙소정보", nav: ""},
        { src: require("../../../assets/drawer/room.svg").default, label: "객실관리", nav: "room" },
        { src: require("../../../assets/drawer/booking.svg").default, label: "예약확인", nav: "booking" },
        { src: require("../../../assets/drawer/review.svg").default, label: "이용후기", nav: "review" },
        { src: require("../../../assets/drawer/message.svg").default, label: "메세지", nav: "msg" }
    ];

    const isActive = (nav: string) => location.pathname === `/me${nav}`;

    return (
        <tw.Container>
            <tw.MenuWrap>
                <tw.MenuLabel>숙소관리</tw.MenuLabel>
                {mgmtList.map((item, index) => (
                    <tw.ListWrap key={index} $isActive={isActive(item.nav) ? 'active' : ''} onClick={()=>{navigate(`/hotel/mgmt/${hotelId}/${item.nav}`)}}>
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