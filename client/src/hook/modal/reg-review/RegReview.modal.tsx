import React, { useEffect, useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./RegReview.modal.styles";
import StarRating from "./StarRating";
import AlertModal from "../alert/Alert.modal";
import { ModalPortal } from "../ModalPortal";

interface ModalProps {
    onClose: () => void;
    hotelId: string | undefined;
    hotelName: string | undefined;
    bookingId: string | undefined;
}

export default function RegReviewModal({ onClose, bookingId, hotelName, hotelId }: ModalProps) {
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
    

    const [reviewData, setReviewData] = useState({
        hotel_id: hotelId,
        booking_id: bookingId,
        rating: 1,
        review: "",
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length <= 200) {
            setReviewData((prevData) => ({
                ...prevData,
                review: newText,
            }));
        }
    };

    const handleRatingChange = (rating: number) => {
        setReviewData((prevData) => ({
            ...prevData,
            rating: (rating + 1) * 2,
        }));
    };

    const clickReviewRegister = async () => {
        try {
            const config = await sendJWT({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                url: "/booking/review/reg",
                data: reviewData,
            });

            await axiosInstance.request(config);
            setAlertMessage("등록되었습니다.");
            const handleModalClose = () => {
                handleCloseClick();
            };
            openAlertModal(handleModalClose);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={handleCloseClick}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>후기 작성</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <tw.SubTitleWrap>
                        <tw.SubTitle>{hotelName}</tw.SubTitle>
                        <tw.BookingId>{bookingId}</tw.BookingId>
                    </tw.SubTitleWrap>
                    <tw.UpperTag>별점</tw.UpperTag>
                    <StarRating onRatingChange={handleRatingChange} />
                    <tw.UpperTag>후기</tw.UpperTag>
                    <tw.AddTextWrap>
                        <tw.AddTextField value={reviewData.review} onChange={handleTextChange}></tw.AddTextField>
                        <tw.AddTextNum $validator={reviewData.review.length > 10} >{reviewData.review.length} / 150</tw.AddTextNum>
                    </tw.AddTextWrap>
                </tw.InputWrap>
                <tw.RegBtn
                onClick={()=>{clickReviewRegister()}}
                $validator={reviewData.review.length > 10} 
                disabled={!(reviewData.review.length > 10)}>
                    등록하기
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
