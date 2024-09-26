import React, { useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./SetMonthPrice.modal.styles"
import { ModalPortal } from "../ModalPortal";
import AlertModal from "../alert/Alert.modal";

interface ModalProps {
    onClose: () => void;
    hotel_id: string | undefined;
    room_id: string | undefined;
    year: number;
    month: number;
}

export default function SetPriceByMonthModal({ onClose, hotel_id, room_id, year, month }: ModalProps) {
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseClick = () => {
        triggerCloseAnimation();
    };

    const triggerCloseAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [onCloseCallback, setOnCloseCallback] = useState<() => void>(() => {});
    const openAlertModal = (callback: () => void) => {
        setOnCloseCallback(() => callback);
        setIsAlertModalOpen(true);
    };

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
        onCloseCallback();
    };

    const [priceData, setPriceData] = useState({
        hotel_id: hotel_id,
        room_id: room_id,
        year: year,
        month: month,
        days: "",
        friday: "",
        saturday: "",
        room_limit: "",
    });

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPriceData({ ...priceData, [name]: value.replace(/[^0-9]/g, "") });
    };

    const isFormValid = () => {
        return (
            priceData.days.toString().trim() !== "" &&
            priceData.friday.toString().trim() !== "" &&
            priceData.saturday.toString().trim() !== "" &&
            priceData.room_limit.toString().trim() !== ""
        );
    };
    

    const onClickSave = async () => {
        try {
            const config = await sendJWT({
                method: "post",
                url: "/room/price/month",
                data: priceData,
            });
            await axiosInstance.request(config);
            setAlertMessage("등록되었습니다.");
            const handleModalClose = () => {};
            openAlertModal(handleModalClose);
            handleCloseClick();
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={onClose}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>가격설정</tw.Title>
                </tw.TitleWrap>
                <tw.SubTitle>
                    {year}년 {month}월
                </tw.SubTitle>
                <tw.InputWrap>
                    <tw.UpperTag>평일</tw.UpperTag>
                    <tw.ContentsFlex>
                    <tw.Input onChange={onChangeInput} value={priceData.days} name="days" maxLength={7} />
                    <tw.Text>원</tw.Text>
                            </tw.ContentsFlex>

                            <tw.UpperTag>금요일</tw.UpperTag>
                            <tw.ContentsFlex>
                            <tw.Input onChange={onChangeInput} value={priceData.friday} name="friday" maxLength={7} />
                            <tw.Text>원</tw.Text>
                            </tw.ContentsFlex>

                            <tw.UpperTag>토요일</tw.UpperTag>
                            <tw.ContentsFlex>
                            <tw.Input onChange={onChangeInput} value={priceData.saturday} name="saturday" maxLength={7} />
                            <tw.Text>원</tw.Text>
                            </tw.ContentsFlex>

                    <tw.UpperTag>방갯수</tw.UpperTag>
                    <tw.ContentsFlex>
                    <tw.Input onChange={onChangeInput} value={priceData.room_limit} name="room_limit" maxLength={2} />
                    <tw.Text>개</tw.Text>
                    </tw.ContentsFlex>
                </tw.InputWrap>
                <tw.RegBtn
                    $validator={isFormValid()}
                    onClick={() => {
                        onClickSave();
                    }}
                    disabled={!isFormValid()}
                >
                    설정하기
                </tw.RegBtn>
            </tw.ModalWrap>

            {isAlertModalOpen && (
                <ModalPortal>
                    <AlertModal message={alertMessage} onClose={closeAlertModal} />
                </ModalPortal>
            )}

        </tw.Container>
    );
}
