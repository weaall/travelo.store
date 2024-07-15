import { useEffect, useState } from "react";
import * as tw from "./MyBooking.styles";
import { sendJWT } from "../../../utils/jwtUtils";
import { axios, axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import ImgLoader from "../../../utils/imgLoader";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import KakaoMapModal from "../../../hook/modal/kakao-map/KakaMap.modal";
import dayjs from "dayjs";

interface Booking {
    booking_id: string;
    hotel_id: number;
    room_id: number;
    total_price: number;
    check_in: string;
    check_out: string;
    name: string;
    phone_num: number;
    email: string;
    hotelData: HotelData;
}

interface HotelData {
    name: string;
    address: string;
    address_detail: string;
    postcode: string;
    always_check_in: number;
    img: Image[];
}

interface Image {
    url: string;
}

export default function MyBookingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [isKakaoMapModalOpen, setIsKakaoMapModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState<any>(null);

    const openKakaoMapModal = (hotelData: HotelData) => {
        setSelectedHotel(hotelData);
        setIsKakaoMapModalOpen(true);
    };

    const closeKakaoMapModal = () => {
        setIsKakaoMapModalOpen(false);
        setSelectedHotel(null);
    };

    const [bookingData, setBookingData] = useState([
        {
            booking_id: "",
            hotel_id: 0,
            room_id: 0,
            total_price: 0,
            check_in: "",
            check_out: "",
            name: "",
            phone_num: 0,
            email: "",

            hotelData: {
                name: "",
                address: "",
                address_detail: "",
                postcode: "",

                always_check_in: 0,

                img: [
                    {
                        url: "",
                    },
                ],
            },
        },
    ]);

    const [hotelDataCache, setHotelDataCache] = useState<{ [hotelId: number]: HotelData }>({});
    const [imageDataCache, setImageDataCache] = useState<{ [hotelId: number]: Image[] }>({});

    const fetchBooking = async () => {
        try {
            const config = await sendJWT({
                method: "GET",
                url: "/booking/user",
            });

            const response = await axiosInstance.request(config);
            const bookings = response.data.data;

            for (let booking of bookings) {
                try {
                    let hotelData = hotelDataCache[booking.hotel_id];
                    let hotelImg = imageDataCache[booking.hotel_id];

                    if (!hotelData) {
                        const hotelResponse = await axiosInstance.get("/hotel/" + booking.hotel_id);
                        hotelData = hotelResponse.data.data[0];
                        setHotelDataCache((prevCache) => ({
                            ...prevCache,
                            [booking.hotel_id]: hotelData,
                        }));
                    }

                    if (!hotelImg) {
                        const hotelImgResponse = await axiosInstance.get(`/hotel/img/${booking.hotel_id}`);
                        hotelImg = hotelImgResponse.data.data;
                        setImageDataCache((prevCache) => ({
                            ...prevCache,
                            [booking.hotel_id]: hotelImg,
                        }));
                    }

                    booking.hotelData = hotelData;
                    booking.hotelData.img = hotelImg;
                } catch (error) {
                    handleAxiosError(error, navigate);
                }
            }
            setBookingData(bookings);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, []);

    if (loading) {
        return <Loading />;
    }

    const groupByCheckInDate = (data: Booking[]) => {
        return data.reduce((acc, booking) => {
            const checkInDate = dayjs(booking.check_in).format("MM월 DD일 (ddd)");
            if (!acc[checkInDate]) {
                acc[checkInDate] = [];
            }
            acc[checkInDate].push(booking);
            return acc;
        }, {} as { [key: string]: Booking[] });
    };

    const sortedBookingData = [...bookingData].sort((a, b) => {
        return new Date(a.check_in).getTime() - new Date(b.check_in).getTime();
    });

    const groupedBookings = groupByCheckInDate(sortedBookingData);

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>예약확인</tw.Title>
                </tw.TitleWrap>
                <tw.ContentsWrap>
                    {Object.keys(groupedBookings).length === 0 ? (
                        <tw.NoBookingWrap>
                            <tw.NoBookingText>예정된 여행이 없어요!</tw.NoBookingText>
                            <tw.GoTripBtn onClick={() => navigate("/")}>여행하러가기</tw.GoTripBtn>
                        </tw.NoBookingWrap>
                    ) : (
                        Object.keys(groupedBookings).map((date) => (
                            <tw.BookingOuterWrap key={date}>
                                <tw.DateTitle>{date}</tw.DateTitle>
                                {groupedBookings[date].map((booking: Booking) => (
                                    <tw.BookingWrap key={booking.booking_id}>
                                        <tw.BookingIdWrap>
                                            <tw.BookingId>ID {booking.booking_id}</tw.BookingId>
                                            <tw.BookingStatus>확정됨</tw.BookingStatus>
                                        </tw.BookingIdWrap>
                                        <tw.FlexWrap>
                                            <tw.Pic>
                                                {booking.hotelData?.img?.[0]?.url ? (
                                                    <ImgLoader imageUrl={booking.hotelData.img[0].url} altText="" rounded="es-xl" />
                                                ) : (
                                                    <tw.UnRegWrap>미등록</tw.UnRegWrap>
                                                )}
                                            </tw.Pic>
                                            <tw.HotelInfo>
                                                <tw.HotelTitle>{booking.hotelData.name}</tw.HotelTitle>
                                                <tw.HotelAddress onClick={() => openKakaoMapModal(booking.hotelData)}>
                                                    {booking.hotelData.address} {booking.hotelData.address_detail}, {booking.hotelData.postcode}
                                                </tw.HotelAddress>
                                                <tw.CheckWrap>
                                                    <tw.CheckInWrap>
                                                        <tw.CheckLabel>체크인</tw.CheckLabel>
                                                        <tw.CheckText>{dayjs(booking.check_in).format("YYYY. MM. DD (dddd)")}</tw.CheckText>
                                                    </tw.CheckInWrap>
                                                    <tw.CheckOutWrap>
                                                        <tw.CheckLabel>체크아웃</tw.CheckLabel>
                                                        <tw.CheckText>{dayjs(booking.check_out).format("YYYY. MM. DD (dddd)")}</tw.CheckText>
                                                    </tw.CheckOutWrap>
                                                </tw.CheckWrap>
                                            </tw.HotelInfo>
                                        </tw.FlexWrap>
                                        <tw.MgmtBtnWrap>
                                            <tw.MgmtBtn>예약 관리하기</tw.MgmtBtn>
                                        </tw.MgmtBtnWrap>
                                    </tw.BookingWrap>
                                ))}
                            </tw.BookingOuterWrap>
                        ))
                    )}
                </tw.ContentsWrap>
            </tw.MobileWrap>

            {isKakaoMapModalOpen && selectedHotel && (
                <ModalPortal>
                    <KakaoMapModal
                        hotelName={selectedHotel.name}
                        address={`${selectedHotel.address} ${selectedHotel.address_detail}`}
                        imgUrl={selectedHotel.img[0].url}
                        onClose={closeKakaoMapModal}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
