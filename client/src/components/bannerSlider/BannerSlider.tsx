import { useState } from "react";
import * as tw from "./BannerSlider.styles";
import ImgLoader from "../../utils/imgLoader";

export default function BannerSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { url: "https://cdn.pixabay.com/photo/2023/08/07/19/47/water-lily-8175845_1280.jpg" },
        { url: "https://cdn.pixabay.com/photo/2023/08/05/08/15/ship-8170663_1280.jpg" },
        { url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg" },
        { url: "https://cdn.pixabay.com/photo/2023/08/07/19/47/water-lily-8175845_1280.jpg" },
        { url: "https://cdn.pixabay.com/photo/2023/08/05/08/15/ship-8170663_1280.jpg" },
        { url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg" },
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
        <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
            <div className="flex items-center">
                <tw.ImgButton onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-500">
                    <tw.Svg src={require("../../assets/svg/left_icon.svg").default} alt="Left" />
                </tw.ImgButton>
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${(currentIndex) * 50}%)`, width: `${images.length * 100}%` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-[50%] h-[130px] flex-shrink-0">
                            <ImgLoader imageUrl={image.url} altText={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
                <tw.ImgButton onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-500">
                    <tw.Svg src={require("../../assets/svg/right_icon.svg").default} alt="Right" />
                </tw.ImgButton>
            </div>
            <div className="text-center mt-2">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}