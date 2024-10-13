import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as tw from "./HotelMgmtDrawer.modal.styles";

interface ModalProps {
    onClose: () => void;
}

export default function HotelMgmtDrawerModal({ onClose }: ModalProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const dynamicPath = location.pathname.match(/\/hotel\/mgmt\/([^/]+)/)?.[1];

    const navigateClick = (url: string) => {
        if (dynamicPath) {
            triggerCloseAnimation();
            navigate(`/hotel/mgmt/${dynamicPath}/${url}`);
        }
    };

    const [isClosing, setIsClosing] = useState(false);

    const triggerCloseAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    const handleExitClick = () => {
        triggerCloseAnimation();
    };

    const mgmtList = [
        { src: require("../../../assets/drawer/hotel_mgmt.svg").default, label: "숙소정보", nav: "" },
        { src: require("../../../assets/drawer/room.svg").default, label: "객실관리", nav: "room" },
        { src: require("../../../assets/drawer/booking.svg").default, label: "예약관리", nav: "booking" },
        { src: require("../../../assets/drawer/review.svg").default, label: "이용후기", nav: "review" },
        { src: require("../../../assets/drawer/message.svg").default, label: "메세지", nav: "msg" }
    ];

    const isActive = (nav: string) => dynamicPath && location.pathname === `/hotel/mgmt/${dynamicPath}/${nav}`;

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalContainer>
                <tw.ModalWrap $isClosing={isClosing}>
                    <tw.TitleWrap>
                        <tw.CloseBtn onClick={() => handleExitClick()}>
                            <tw.CloseSVG alt="" src={require("../../../assets/svg_black/right_icon.svg").default}></tw.CloseSVG>
                        </tw.CloseBtn>
                    </tw.TitleWrap>
                    <tw.ContentsWrap>
                        <tw.MenuWrap>
                            <tw.MenuLabel>숙소관리</tw.MenuLabel>
                            {mgmtList.map((item, index) => (
                                <tw.ListWrap
                                    key={index}
                                    $isActive={isActive(item.nav) ? "active" : ""}
                                    onClick={() => {
                                        navigateClick(item.nav);
                                    }}
                                >
                                    <tw.SvgWrap>
                                        <tw.Svg alt="" src={item.src} />
                                    </tw.SvgWrap>
                                    <tw.Label>{item.label}</tw.Label>
                                </tw.ListWrap>
                            ))}
                        </tw.MenuWrap>
                    </tw.ContentsWrap>
                </tw.ModalWrap>
            </tw.ModalContainer>
        </tw.Container>
    );
}
