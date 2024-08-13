import React, { useState } from "react";
import * as tw from "./ReviewList.styles";  // Tailwind CSS 스타일을 정의한 파일

interface Review {
    check_in: string;
    rating: number;
    review: string;
    name: string;
}

interface CustomSliderProps {
    reviewList: Review[];
    getInitialAndLastChar: (name: string) => string;
}

const ITEMS_PER_PAGE = 3;

const ReviewSlider: React.FC<CustomSliderProps> = ({ reviewList, getInitialAndLastChar }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(reviewList.length / ITEMS_PER_PAGE);

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : totalPages - 1));
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : 0));
    };

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return (
        <div className="relative w-full overflow-hidden">
            <button
                onClick={prevPage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black z-10"
                disabled={totalPages <= 1}
            >
                &lt;
            </button>
            <div className="flex gap-4 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentPage * 100}%)`, width: `${totalPages * 100}%` }}>
                {reviewList.map((review, index) => (
                    <tw.ReviewWrap key={review.check_in} className="flex-none w-1/3 p-4 border border-gray-300 rounded-lg bg-white">
                        <tw.Review
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            <tw.Rating>{review.rating * 2}</tw.Rating>
                            {review.review}
                        </tw.Review>
                        <tw.Name>{getInitialAndLastChar(review.name)}</tw.Name>
                    </tw.ReviewWrap>
                ))}
            </div>
            <button
                onClick={nextPage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black z-10"
                disabled={totalPages <= 1}
            >
                &gt;
            </button>
        </div>
    );
};

export default ReviewSlider;
