import React, { DragEvent, useEffect, useState } from "react";
import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./RegReview.modal.styles";
import { nanoid } from "nanoid";
import StarRating from "./StarRating";

interface ModalProps {
    onClose: () => void;
    hotelName: string | undefined;
    bookingId: string | undefined;
}

export default function RegReviewModal({ onClose, bookingId, hotelName }: ModalProps) {
    const navigate = useNavigate();

    const [reviewData, setReviewData] = useState({
        hotel_id: "",
        booking_id: bookingId,
        rating: 0,
        review: "",
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length <= 150) {
            setReviewData((prevData) => ({
                ...prevData,
                review: newText,
            }));
        }
    };

    const handleRatingChange = (rating: number) => {
        setReviewData((prevData) => ({
            ...prevData,
            rating: rating + 1,
        }));
    };

    useEffect(() => {}, []);

    // const clickReviewRegister = async () => {
    //     try {

    //         const config = await sendJWT({
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             method: "put",
    //             url: "/room/info",
    //         });

    //         const response = await axiosInstance.request(config);
    //         window.alert("저장완료");
    //         onClose();
    //     } catch (error) {
    //         handleAxiosError(error, navigate);
    //     }
    // };

    useEffect(() => {}, []);

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={onClose}>
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
                        <tw.AddTextNum>{reviewData.review.length} / 150</tw.AddTextNum>
                    </tw.AddTextWrap>
                </tw.InputWrap>
                <tw.RegBtn $validator={true} disabled={true}>
                    등록하기
                </tw.RegBtn>
            </tw.ModalWrap>
        </tw.Container>
    );
}
