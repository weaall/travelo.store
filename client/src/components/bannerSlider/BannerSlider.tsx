import { useState, useEffect, useCallback } from "react";
import * as tw from "./BannerSlider.styles";
import ImgLoader from "../../utils/imgLoader";
import { useNavigate } from "react-router-dom";

export default function BannerSlider() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640); 

    const images = [
        { url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/banner/banner_blog1.svg", href: "https://weaall.github.io" },
        { url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/banner/banner_signiel.svg", href: "/" },
        { url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/banner/banner_conred.svg" , href: "/" },
        { url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/banner/banner_blog2.svg", href: "https://weaall.github.io" },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, currentIndex]);

    const prevSlide = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    const containerStyle = {
        transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`,
        width: `${(images.length + 1) * 100}%`
    };

    if (!images || images.length === 0) {
        return <tw.UnRegWrap>미등록</tw.UnRegWrap>;
    }

    return (
        <tw.Container>
            <tw.ImgContainer>
                <tw.ImgButton onClick={prevSlide} className="left-0">
                    <tw.Svg src={require("../../assets/svg/left_icon.svg").default} alt="Left" />
                </tw.ImgButton>
                <tw.ImgListWrap style={containerStyle}>
                    {images.map((image, index) => (
                        <tw.ImgWrap key={index} onClick={() => window.open(image.href, '_blank')}>
                            <ImgLoader imageUrl={image.url} altText={`Slide ${index}`} rounded="2xl"/>
                        </tw.ImgWrap>
                    ))}
                    <tw.ImgWrap>
                        <ImgLoader imageUrl={images[0].url} altText={`Slide 0`} rounded="2xl"/>
                    </tw.ImgWrap>
                </tw.ImgListWrap>
                <tw.ImgButton onClick={nextSlide} className="right-0">
                    <tw.Svg src={require("../../assets/svg/right_icon.svg").default} alt="Right" />
                </tw.ImgButton>
            </tw.ImgContainer>
            <tw.IndexWrap>
                <tw.ToggleBtn onClick={togglePlay}>
                    {isPlaying ? (
                        <tw.Svg src={require("../../assets/svg/pause_icon.svg").default} alt="Pause" />
                    ) : (
                        <tw.Svg src={require("../../assets/svg/play_icon.svg").default} alt="Play" />
                    )}
                </tw.ToggleBtn>
                <tw.Index>
                    <tw.ToggleBtn onClick={prevSlide}>
                        <tw.Svg src={require("../../assets/svg_black/left_icon.svg").default} alt="Pause" />
                    </tw.ToggleBtn>
                        {currentIndex + 1} /<tw.IndexSpan>{images.length}</tw.IndexSpan>
                    <tw.ToggleBtn onClick={nextSlide}>
                        <tw.Svg src={require("../../assets/svg_black/right_icon.svg").default} alt="Pause" />
                    </tw.ToggleBtn>
                </tw.Index>
            </tw.IndexWrap>
        </tw.Container>
    );
}
