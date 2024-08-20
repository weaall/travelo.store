import { useState } from "react";
import * as tw from "./BannerSlider.styles";
import ImgLoader from "../../utils/imgLoader";

export default function BannerSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { url: "https://yaimg.yanolja.com/v5/2024/08/17/00/66bfe92631e400.57977879.png" },
        { url: "https://yaimg.yanolja.com/v5/2024/07/22/10/669e30bb773633.98566458.png" },
    ];

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
        <tw.Container>
            <tw.ImgContainer>
                <tw.ImgButton onClick={prevSlide} className="left-2">
                    <tw.Svg alt="" src={require("../../assets/svg/left_icon.svg").default} />
                </tw.ImgButton>
                {images[currentIndex]?.url ? (
                    <ImgLoader imageUrl={images[currentIndex].url} altText={`Slide ${currentIndex}`} />
                ) : (
                    <tw.UnRegWrap>미등록</tw.UnRegWrap>
                )}
                <tw.ImgButton onClick={nextSlide} className="right-2">
                    <tw.Svg alt="" src={require("../../assets/svg/right_icon.svg").default} />
                </tw.ImgButton>
            </tw.ImgContainer>
            <tw.Index>
                {currentIndex + 1} / {images.length}
            </tw.Index>
        </tw.Container>
    );
}
