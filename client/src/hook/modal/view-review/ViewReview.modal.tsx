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
    const [loading, setLoading] = useState(true);

    const [reviewData, setReviewData] = useState({
        hotel_id: "",
        booking_id: "",
        rating: 0,
        review: "",
        name: "",
        check_in: "",
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

    const fetchReview = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/booking/review/booking/" + bookingId);
            setReviewData(response.data.data[0]);
            console.log(response.data.data[0])
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
                    <tw.ReviewWrap>
                        <tw.RatingWrap>
                            <tw.Rating>{reviewData.rating * 2}</tw.Rating>
                            <tw.Name>{reviewData.name}</tw.Name>
                            <tw.Date>{reviewData.check_in}</tw.Date>
                        </tw.RatingWrap>
                        <tw.Review>{reviewData.review}</tw.Review>
                    </tw.ReviewWrap>
                </tw.InputWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
