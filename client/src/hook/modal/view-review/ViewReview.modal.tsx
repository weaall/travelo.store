import React, { useEffect, useState } from "react";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

import * as tw from "./ViewReview.modal.styles";
import Loading from "../../../components/loading/Loading";

interface ModalProps {
    onClose: () => void;
    bookingId: string | undefined;
    hotelName: string | undefined;
}

export default function ViewReviewModal({ onClose, bookingId, hotelName}: ModalProps) {
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

    const [loading, setLoading] = useState(true);

    const [reviewData, setReviewData] = useState({
        hotel_id: "",
        booking_id: "",
        rating: 0,
        review: "",
        name: "",
        check_in: "",
    });

    const getInitialAndLastChar = (name: string) => {
        if (name.length === 0) return "";
        if (name.length === 1) return name;
        if (name.length === 2) return `${name.charAt(0)}*`;
        return `${name.charAt(0)}${" * ".repeat(name.length - 2)}${name.charAt(name.length - 1)}`;
    };

    const fetchReview = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/booking/review/booking/" + bookingId);
            setReviewData(response.data.data[0]);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReview();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={handleCloseClick}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>후기</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                    <tw.SubTitleWrap>
                        <tw.SubTitle>{hotelName}</tw.SubTitle>
                        <tw.Date>{reviewData.check_in}</tw.Date>
                    </tw.SubTitleWrap>
                    <tw.ReviewWrap>
                        <tw.Review>
                            <tw.Rating>{reviewData.rating * 2}</tw.Rating>
                            {reviewData.review}
                        </tw.Review>
                    </tw.ReviewWrap>
                    <tw.Name>{getInitialAndLastChar(reviewData.name)}</tw.Name>
                </tw.InputWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
