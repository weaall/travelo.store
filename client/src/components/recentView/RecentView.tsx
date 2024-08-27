import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { axiosInstance, handleAxiosError } from "../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import * as tw from "./RecentView.styles";
import ImgLoader from "../../utils/imgLoader";
import Loading from "../loading/Loading";
import { encrypt } from "../../utils/cryptoJs";
import dayjs from "dayjs";
import { getThumbnailCFUrl } from "../../utils/s3UrlToCFD.utils";

interface HotelData {
    id: number;
    name: string;
    rating: number;
}

export default function RecentView() {
    const navigate = useNavigate();
    const [hotelData, setHotelData] = useState<HotelData[]>([]);

    const fetchHotels = async (hotelIds: string[]) => {
        try {
            const fetchedHotels: HotelData[] = [];

            for (const id of hotelIds) {
                if (!id) continue;

                const response = await axiosInstance.get(`/hotel/${id}`);
                const hotel = response.data.data[0];

                const ratingResponse = await axiosInstance.get(`/hotel/rating/${hotel.id}`);
                const rating = ratingResponse.data.data[0].rating;

                if (!fetchedHotels.some(h => h.id === hotel.id)) {
                    fetchedHotels.push({
                        id: hotel.id,
                        name: hotel.name,
                        rating: rating,
                 });
                }
            }

            setHotelData(fetchedHotels);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    };

    const clickHotel = (hotelId: number) => {
        const encryptedId = encrypt(`${hotelId}`);
        const today = dayjs().format("YYYY-MM-DD");
        const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
        navigate(`/hotel/${encryptedId}/${today}/${tomorrow}/${2}/${0}`);
    };

    useEffect(() => {
        const recentHotels = Cookies.get("recentHotels");
        if (recentHotels) {
            let hotelIds: string[] = JSON.parse(recentHotels);
            hotelIds = hotelIds.filter(id => id.trim() !== ""); 
            hotelIds = Array.from(new Set(hotelIds));
            fetchHotels(hotelIds);
        }
    }, []);

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.Lable>최근 본 상품</tw.Lable>
                {hotelData.length === 0 ? (
                    <tw.NoCookieWrap>최근 본 상품이 없습니다.</tw.NoCookieWrap>
                ) : (
                    <tw.HotelList>
                        {hotelData.map(hotel => (
                            <tw.HotelWrap key={hotel.id} onClick={() => clickHotel(hotel.id)}>
                                <tw.HotelImgWrap>
                                    <ImgLoader imageUrl={getThumbnailCFUrl(`/hotel_img/${hotel.id}`)} altText={hotel.name} rounded="l-2xl" />
                                </tw.HotelImgWrap>
                                <tw.HotelInfoWrap>
                                    <tw.HotelName>{hotel.name}</tw.HotelName>
                                    <tw.RatingWrap>
                                        <tw.RatingSvg alt="" src={require("../../assets/svg/star_icon.svg").default} />
                                        <tw.HotelRating>{hotel.rating === null ? "-" : `${hotel.rating}`}</tw.HotelRating>
                                    </tw.RatingWrap>
                                </tw.HotelInfoWrap>
                            </tw.HotelWrap>
                        ))}
                    </tw.HotelList>
                )}
            </tw.ContentsWrap>
        </tw.Container>
    );
}