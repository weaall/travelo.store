import React, { useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import * as tw from "./SetBookingStatus.modal.styles";
import { encrypt } from "../../../utils/cryptoJs";

interface ModalProps {
    onClose: () => void;
    hotelId: number | undefined;
    bookingId: string | undefined;
    status: number | undefined;
    checkInDate: string | undefined;
    userId: number | undefined;
}

export default function SetBookingStatusModal({ onClose, bookingId, status, hotelId, checkInDate, userId }: ModalProps) {
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);

    const triggerCloseAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    const today = dayjs().format("YYYY-MM-DD");

    const [statusData, setStatusData] = useState({
        hotel_id: hotelId,
        booking_id: bookingId,
        status: String(status || "0"),
    });

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusData((prevData) => ({
            ...prevData,
            status: e.target.value,
        }));
    };

    const clickBookingStatusRegister = async () => {
        try {
            const config = await sendJWT({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "put",
                url: "/booking/hotel/update/status",
                data: statusData,
            });

            await axiosInstance.request(config);
            window.alert("저장완료");
            triggerCloseAnimation();
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const getAvailableOptions = () => {
        if (status === 1) {
            return (
                <>
                    <tw.Option value="1">결제완료</tw.Option>
                    <tw.Option value="2">예약확정</tw.Option>
                    <tw.Option value="4">취소</tw.Option>
                </>
            );
        } else if (status === 2 || status === 3) {
            return <tw.Option value="4">취소</tw.Option>;
        } else {
            return <tw.Option>수정불가</tw.Option>;
        }
    };

    const isCheckInTodayOrEarlier = dayjs(checkInDate).isSame(today) || dayjs(checkInDate).isBefore(today);

    const clickChat = (hotelId: number, userId: number) => {
        const encryptedHotelId = encrypt(`${hotelId}`);
        const encryptedUserId = encrypt(`${userId}`);
        navigate(`../msg/chat/${encryptedHotelId}/${encryptedUserId}`);
    };

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={triggerCloseAnimation}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>예약 상태 변경</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <tw.SubTitleWrap>
                        <tw.BookingId>{bookingId}</tw.BookingId>
                        <tw.BookingId>
                            {status === 0
                                ? "미결제"
                                : status === 1
                                ? "결제완료"
                                : status === 2
                                ? "예약확정"
                                : status === 3
                                ? "취소요청"
                                : status === 4
                                ? "취소"
                                : "확인필요"}
                        </tw.BookingId>
                    </tw.SubTitleWrap>
                    <tw.UpperTag>예약상태</tw.UpperTag>
                    <tw.SelectFilter value={statusData.status} onChange={handleStatusChange} disabled={status === 4 || isCheckInTodayOrEarlier}>
                        {getAvailableOptions()}
                    </tw.SelectFilter>
                    {isCheckInTodayOrEarlier && <tw.BlockLabel>체크인이 당일이거나, 지난 이후 예약 상태를 변경할 수 없습니다.</tw.BlockLabel>}
                </tw.InputWrap>
                <tw.BtnWrap>
                    <tw.ConfirmBtn
                        onClick={clickBookingStatusRegister}
                        $validator={status !== 4 && !isCheckInTodayOrEarlier}
                        disabled={status !== 4 || isCheckInTodayOrEarlier}
                    >
                        수정하기
                    </tw.ConfirmBtn>
                    <tw.MsgBtn onClick={() => clickChat(hotelId || 0, userId || 0)}>메세지</tw.MsgBtn>
                </tw.BtnWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
