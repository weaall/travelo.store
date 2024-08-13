import React, { useState } from "react";
import * as tw from "./ReviewList.styles"; // Tailwind CSS 스타일을 정의한 파일

interface Review {
    check_in: string;
    rating: number;
    review: string;
    name: string;
}

interface CustomSliderProps {
    reviewList: Review[];
}

const ITEMS_PER_PAGE = 3; // 각 페이지에 표시할 리뷰 수를 4로 설정

const ReviewPagination: React.FC<CustomSliderProps> = ({ reviewList }) => {
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
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4">
                {currentReviews.map((review, index) => (
                    <tw.ReviewWrap key={index} className="p-4 border border-gray-300 rounded-lg bg-white">
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
            <div className="flex justify-between mt-4">
                <button onClick={prevPage} className="bg-transparent border-none cursor-pointer text-xl text-black" disabled={currentPage === 0}>
                    Previous
                </button>
                <span className="text-gray-500">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button onClick={nextPage} className="bg-transparent border-none cursor-pointer text-xl text-black" disabled={currentPage >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ReviewPagination;
