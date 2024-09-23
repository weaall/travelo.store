import { useNavigate } from "react-router-dom";
import * as tw from "./RecRegion.styles";
import ImgLoader from "../../utils/imgLoader";
import dayjs from "dayjs";
import { useRef, useState, MouseEvent } from "react";

interface Region {
    name: string;
    url: string;
}

export default function RecRegion() {
    const navigate = useNavigate();
    const regionListRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);

    const regions: Region[] = [
        { name: "서울", url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/region/seoul.png" },
        { name: "부산", url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/region/busan.png" },
        { name: "강릉", url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/region/seoul.png" },
        { name: "양양", url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/region/seoul.png" },
        { name: "여수", url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/region/seoul.png" },
        { name: "가평", url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/region/seoul.png" },
        { name: "안산", url: "https://weaall-s3.s3.ap-northeast-2.amazonaws.com/region/seoul.png" },
    ];

    const clickRegion = (name: string) => {
        const today = dayjs().format("YYYY-MM-DD");
        const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
        navigate(`/search/${name}/${today}/${tomorrow}/${2}/${0}`);
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (regionListRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - regionListRef.current.offsetLeft);
            setScrollLeft(regionListRef.current.scrollLeft);
        }
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !regionListRef.current) return;
        e.preventDefault();
        const x = e.pageX - regionListRef.current.offsetLeft;
        const walk = (x - startX) * 1.2;
        regionListRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.Lable>추천 여행지</tw.Lable>
                <tw.RegionList
                    ref={regionListRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {regions.map((region) => (
                        <tw.RegionWrap key={region.name} onClick={() => clickRegion(region.name)}>
                            <tw.ImgWrap>
                                <ImgLoader imageUrl={region.url} altText={region.name} rounded="full" />
                            </tw.ImgWrap>
                            <tw.RegionLabel>{region.name}</tw.RegionLabel>
                        </tw.RegionWrap>
                    ))}
                </tw.RegionList>
            </tw.ContentsWrap>
        </tw.Container>
    );
}
