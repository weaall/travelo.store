import { useEffect, useState } from "react"
import * as tw from "./Booking.styles"
import { sendJWT } from "../../../utils/jwtUtils"
import { axios, axiosInstance } from "../../../utils/axios.utils"
import { useNavigate } from "react-router-dom"
import { userDataProps } from "../../../interface/interfaces"
import Loading from "../../../components/loading/Loading"

export default function BookingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [isKakaoMapModalOpen, setIsKakaoMapModalOpen] = useState(false);

    const openKakaoMapModal = () => {
        setIsKakaoMapModalOpen(true);
    };

    const closeKakaoMapModal = () => {
        setIsKakaoMapModalOpen(false);
    };

    const [bookingData, setBookingData] = useState([{
        booking_id: "",
        hotel_id: 0,
        room_id: 0,
        total_price: 0,
        check_in: "",
        check_out: "",
        name: "",
        phone_num: 0,
        emial: "",
    }]);

    const [hotelList, setHotelList] = useState([{
        id: "",
        name: "",
        address: "",
        address_detail: "",
        postcode: "",
        description: "",
        check_in: 0,
        check_out: 0,

        wifi: 0,
        always_check_in: 0,
        breakfast: 0,
        barbecue: 0,

        carpark: 0,
        restaurnat: 0,
        cafe: 0,
        swimming_pool: 0,
        spa: 0,
        fitness: 0,
        convenience_store: 0,

        img: [
            {
                url: "",
            },
        ],
    }]);

    const fetchBooking = async () => {
        try {
            const config = await sendJWT({
                method: "GET",
                url: "/booking/user",
            });

            const response = await axiosInstance.request(config);
            const bookingData = response.data.data;
            setBookingData(response.data.data);
            fetchHotelList(bookingData.hotel_id);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchHotelList = async (hotelId: number) => {
        try {
            const hotelResponse = await axiosInstance.get("/hotel/" + hotelId);
            let hotelData = hotelResponse.data.data[0];

            const hotelImgResponse = await axiosInstance.get("/hotel/img/" + hotelId);
            hotelData.img = hotelImgResponse.data.data;

            setHotelList(hotelData);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/");
                }
            }
        }
    };

    useEffect(() => {
        fetchBooking();
    }, []);
    if (loading) {
        return <Loading />;
    }

    return (
        <tw.Container>
                <tw.MobileWrap>
                    <tw.TitleWrap>
                        <tw.Title>예약확인</tw.Title>
                    </tw.TitleWrap>
                    <tw.InputWrap>
                    </tw.InputWrap>
                </tw.MobileWrap>
        </tw.Container>
    );
}
