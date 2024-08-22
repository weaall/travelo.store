import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { axiosInstance, handleAxiosError } from "../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

interface HotelData {
    id: string;
    name: string;
    rating: number;
}

export default function RecentView() {
    const navigate = useNavigate();
    const [hotelData, setHotelData] = useState<HotelData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const recentHotels = Cookies.get("recentHotels");
        if (recentHotels) {
            const hotelIds: string[] = JSON.parse(recentHotels);
            fetchHotels(hotelIds);
        }
    }, []);

    const fetchHotels = async (hotelIds: string[]) => {
        setLoading(true);
        try {
            const fetchedHotels: HotelData[] = [];

            for (const id of hotelIds) {
                // 호텔 기본 정보 가져오기
                const response = await axiosInstance.get(`/hotel/${id}`);
                const hotel = response.data.data[0];

                // 호텔의 평점 정보 가져오기
                const ratingResponse = await axiosInstance.get(`/hotel/rating/${hotel.id}`);
                const rating = ratingResponse.data.data[0].rating;

                // 호텔 정보를 HotelData 형태로 저장
                fetchedHotels.push({
                    id: hotel.id,
                    name: hotel.name,
                    rating: rating,
                });
            }

            setHotelData(fetchedHotels);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {hotelData.length === 0 ? (
                <p>No recent hotels viewed</p>
            ) : (
                <ul>
                    {hotelData.map((hotel) => (
                        <li key={hotel.id}>
                            {hotel.name} - Rating: {hotel.rating}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
