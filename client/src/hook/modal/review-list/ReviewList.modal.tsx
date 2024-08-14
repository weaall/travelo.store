import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as tw from "./ReviewList.styles";
import Loading from "../../../components/loading/Loading";
import dayjs from "dayjs";

interface ModalProps {
    onClose: () => void;
    reviewList: Review[]
}

interface Review {
    check_in: string;
    rating: number;
    review: string;
    name: string;
}

interface CustomSliderProps {
    reviewList: Review[];
}

const ITEMS_PER_PAGE = 3;

export default function ReviewListModal({ onClose, reviewList}: ModalProps) {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(reviewList.length / ITEMS_PER_PAGE);

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : prevPage));
    };

    const getInitialAndLastChar = (name: string) => {
        if (name.length === 0) return "";
        if (name.length === 1) return name;
        if (name.length === 2) return `${name.charAt(0)}*`;
        return `${name.charAt(0)}${" * ".repeat(name.length - 2)}${name.charAt(name.length - 1)}`;
    };

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const currentReviews = reviewList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <tw.Container>
            <tw.ModalWrap>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={onClose}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>후기</tw.Title>
                </tw.TitleWrap>
                <tw.InputWrap>
                        <tw.ReviewList>
                            {currentReviews.map((review, index) => (
                                <tw.ReviewWrap key={index}>
                                    <tw.Date>{dayjs(review.check_in).format("YYYY년 MM월 DD일")}</tw.Date>
                                    <tw.Review>
                                        <tw.Rating>{review.rating}</tw.Rating>
                                        {review.review}
                                    </tw.Review>
                                    <tw.Name>{getInitialAndLastChar(review.name)}</tw.Name>
                                </tw.ReviewWrap>
                            ))}
                        </tw.ReviewList>
                        <tw.ButtonWrap>
                            <tw.ImgButton onClick={prevPage} disabled={currentPage === 0}>
                                <tw.Svg alt="" src={require("../../../assets/svg/left_icon.svg").default} />
                            </tw.ImgButton>

                            <tw.PageNav>
                                {currentPage + 1} / {totalPages}
                            </tw.PageNav>

                            <tw.ImgButton onClick={nextPage} disabled={currentPage >= totalPages - 1}>
                                <tw.Svg alt="" src={require("../../../assets/svg/right_icon.svg").default} />
                            </tw.ImgButton>
                        </tw.ButtonWrap>
                </tw.InputWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
