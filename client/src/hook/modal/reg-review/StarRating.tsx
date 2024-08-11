import React, { useState } from "react";

interface StarRatingProps {
    maxRating?: number;
    onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxRating = 5, onRatingChange }) => {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);

    const handleRating = (index: number) => {
        setRating(index);
        if (onRatingChange) {
            onRatingChange(index);
        }
    };

    const handleMouseOver = (index: number, fraction: number) => {
        setHover(index + fraction);
    };

    return (
        <div style={{ display: "inline-block", position: "relative", fontSize: "20px" }}>
            {[...Array(maxRating)].map((_, index) => {
                const starIndex = index;
                return (
                    <div
                        key={starIndex}
                        style={{
                            display: "inline-block",
                            position: "relative",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                            color: "#ccc",
                        }}
                        onMouseMove={(e) => {
                            const { left, width } = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - left;
                            const fraction = x < width / 2 ? -0.5 : 0;
                            handleMouseOver(index, fraction);
                        }}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleRating(hover)}
                    >
                        <span
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                color: "#ccc",
                            }}
                        >
                            ★
                        </span>
                        <span
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "41.5%",
                                overflow: "hidden",
                                color: "#FFD700",
                                visibility: hover >= starIndex - 0.5 || rating >= starIndex - 0.5 ? "visible" : "hidden",
                            }}
                        >
                            ★
                        </span>
                        <span
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                color: "#FFD700",
                                visibility: hover >= starIndex || rating >= starIndex ? "visible" : "hidden",
                            }}
                        >
                            ★
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default StarRating;
