import React, { useState } from "react";
import * as tw from "./imgSliderMain.styles";

interface Image {
    url: string;
}

interface CustomImageSliderProps {
    images: Image[];
}

export default function ImgSliderMain({ images }: CustomImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    if (!images || images.length === 0) {
        return <tw.UnRegWrap>미등록</tw.UnRegWrap>;
    }

    return (
        <tw.ImgContainer>
            <tw.ImgButton onClick={prevSlide} className="left-2">
                {"<"}
            </tw.ImgButton>
            {images[currentIndex]?.url ? (
                <tw.Img src={images[currentIndex].url} alt={`Slide ${currentIndex}`} loading="lazy" />
            ) : (
                <tw.UnRegWrap>미등록</tw.UnRegWrap>
            )}
            <tw.ImgButton onClick={nextSlide} className="right-2">
                {">"}
            </tw.ImgButton>
            <tw.IndexWrap>
                {currentIndex + 1} / {images.length}
            </tw.IndexWrap>
        </tw.ImgContainer>
    );
}
