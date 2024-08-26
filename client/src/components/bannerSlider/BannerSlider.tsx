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
        { url: "https://cdn.pixabay.com/photo/2023/08/07/19/47/water-lily-8175845_1280.jpg", href: "/" },
        { url: "https://cdn.pixabay.com/photo/2023/08/05/08/15/ship-8170663_1280.jpg", href: "/" },
        { url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg" , href: "/" },
        { url: "https://cdn.pixabay.com/photo/2023/08/07/19/47/water-lily-8175845_1280.jpg" , href: "/" },
        { url: "https://cdn.pixabay.com/photo/2023/08/05/08/15/ship-8170663_1280.jpg" , href: "/" },
        { url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg", href: "/" },
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
                        <tw.ImgWrap key={index} onClick={()=>navigate(`${image.href}`)}>
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
