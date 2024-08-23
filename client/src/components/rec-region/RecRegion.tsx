import { useNavigate } from "react-router-dom";
import * as tw from "./RecRegion.styles"
import ImgLoader from "../../utils/imgLoader";
import { encrypt } from "../../utils/cryptoJs";
import dayjs from "dayjs";

export default function RecRegion() {
    const navigate = useNavigate();

    const regions = [
        {name: "서울", url: "https://cdn.pixabay.com/photo/2023/08/07/19/47/water-lily-8175845_1280.jpg"},
        {name: "부산", url: "https://cdn.pixabay.com/photo/2023/08/05/08/15/ship-8170663_1280.jpg",},
        {name: "강릉", url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg"},
        {name: "양양", url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg"},
        {name: "여수", url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg"},
        {name: "가평", url: "https://cdn.pixabay.com/photo/2017/07/06/19/57/sky-2479213_1280.jpg"},
    ]

    const clickRegion = (name: string) => {
        const today = dayjs().format('YYYY-MM-DD');
        const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
        navigate(`/search/${name}/${today}/${tomorrow}/${2}/${0}`);
    };

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.Lable>추천 여행지</tw.Lable>
                <tw.RegionList>
                    {regions.map((region) => (
                        <tw.RegionWrap key={region.name}>
                            <tw.ImgWrap onClick={()=>clickRegion(region.name)}>
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
