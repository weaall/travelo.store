import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { HeaderRenderAtom } from "../../../recoil/HeaderRender.Atom";
import { useState } from "react";
import ConfirmModal from "../../../hook/modal/alert-confirm/Confirm.modal";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import * as tw from "./UserMenu.modal.styles";

interface ModalProps {
    onClose: () => void;
}

export default function UserMenuModal({ onClose }: ModalProps) {
    const [headerRender, setHeaderRender] = useRecoilState(HeaderRenderAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const [alertMessage, setAlertMessage] = useState("");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [onCloseConfirmCallback, setOnCloseConfirmCallback] = useState<(result: boolean) => void>(() => {});

    const openConfirmModal = (message: string, callback: (result: boolean) => void) => {
        setAlertMessage(message);
        setOnCloseConfirmCallback(() => callback);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = (result: boolean) => {
        setIsConfirmModalOpen(false);
        onCloseConfirmCallback(result);

        if (result) {
            triggerCloseAnimation();
        }
    };

    const logoutClick = () => {
        openConfirmModal("로그아웃 하시겠습니까?", (result) => {
            if (result) {
                Cookies.remove("jwt");
                setHeaderRender((prevCount) => prevCount + 1);
                navigate("/");
            }
        });
    };

    const navigateClick = (url: string) => {
        setHeaderRender((prevCount) => prevCount + 1);
        triggerCloseAnimation();
        navigate(`/${url}`);
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

    const myPageList = [
        { src: require("../../../assets/drawer/mypage.svg").default, label: "내정보", nav: "" },
        { src: require("../../../assets/drawer/booking.svg").default, label: "예약확인", nav: "/booking" },
        { src: require("../../../assets/drawer/review.svg").default, label: "이용후기", nav: "/review" },
        { src: require("../../../assets/drawer/message.svg").default, label: "메세지", nav: "/message" },
    ];

    const hotelMgmtList = [
        { src: require("../../../assets/drawer/hotel_add.svg").default, label: "숙소등록", nav: "/hotelreg" },
        { src: require("../../../assets/drawer/hotel_mgmt.svg").default, label: "숙소관리", nav: "/hotel" },
    ];

    const isActive = (nav: string) => location.pathname === `/me${nav}`;

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalContainer>
                <tw.ModalWrap $isClosing={isClosing}>
                    <tw.TitleWrap>
                        <tw.CloseBtn onClick={() => handleExitClick()}>
                            <tw.CloseSVG alt="" src={require("../../../assets/svg_black/right_icon.svg").default}></tw.CloseSVG>
                        </tw.CloseBtn>
                    </tw.TitleWrap>
                    <tw.MenuWrap>
                        <tw.MenuLabel>마이페이지</tw.MenuLabel>
                        {myPageList.map((item, index) => (
                            <tw.ListWrap
                                key={index}
                                $isActive={isActive(item.nav) ? "active" : ""}
                                onClick={() => {
                                    navigateClick(`me${item.nav}`);
                                }}
                            >
                                <tw.SvgWrap>
                                    <tw.Svg alt="" src={item.src} />
                                </tw.SvgWrap>
                                <tw.Label>{item.label}</tw.Label>
                            </tw.ListWrap>
                        ))}
                        <tw.MenuLabel>숙소관리</tw.MenuLabel>
                        {hotelMgmtList.map((item, index) => (
                            <tw.ListWrap
                                key={index}
                                $isActive={isActive(item.nav) ? "active" : ""}
                                onClick={() => {
                                    navigateClick(`me${item.nav}`);
                                }}
                            >
                                <tw.SvgWrap>
                                    <tw.Svg alt="" src={item.src} />
                                </tw.SvgWrap>
                                <tw.Label>{item.label}</tw.Label>
                            </tw.ListWrap>
                        ))}
                        <tw.SignOutBtn onClick={logoutClick}>로그아웃</tw.SignOutBtn>
                    </tw.MenuWrap>
                </tw.ModalWrap>
            </tw.ModalContainer>

            {isConfirmModalOpen && (
                <ModalPortal>
                    <ConfirmModal message={alertMessage} onClose={closeConfirmModal} />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
