import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import ImgLoader from "../../../utils/imgLoader";
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import KakaoMapModal from "../../../hook/modal/kakao-map/KakaMap.modal";
import LoadingModal from "../../../hook/modal/loading/Loading.modal";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";
import { getThumbnailCFUrl } from "../../../utils/s3UrlToCFD.utils";

import * as tw from "./MyBooking.styles";

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
    status: number;
    hotelData: HotelData;
}

interface HotelData {
    name: string;
    address: string;
    address_detail: string;
    postcode: string;
    always_check_in: number;
}

export default function MyBookingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const openLoadingModal = () => {
        setLoading(true);
    };
    const closeLoadingModal = () => {
        setLoading(false);
    };

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

    const [bookingData, setBookingData] = useState<Booking[]>([]);

    const [hotelDataCache, setHotelDataCache] = useState<{ [hotelId: number]: HotelData }>({});

    const fetchBooking = useCallback(async () => {
        openLoadingModal();
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

                    if (!hotelData) {
                        const hotelResponse = await axiosInstance.get("/hotel/" + booking.hotel_id);
                        hotelData = hotelResponse.data.data[0];
                        setHotelDataCache((prevCache) => ({
                            ...prevCache,
                            [booking.hotel_id]: hotelData,
                        }));
                    }

                    booking.hotelData = hotelData;
                } catch (error) {
                    handleAxiosError(error, navigate);
                }
            }
            setBookingData(bookings);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    }, [navigate, hotelDataCache]);

    useEffect(() => {
        fetchBooking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                            <tw.BookingStatus $state={booking.status}>
                                                {booking.status === 0
                                                    ? "미결제"
                                                    : booking.status === 1
                                                    ? "결제완료"
                                                    : booking.status === 2
                                                    ? "예약확정"
                                                    : booking.status === 3
                                                    ? "취소요청"
                                                    : booking.status === 4
                                                    ? "취소"
                                                    : "확인필요"}
                                            </tw.BookingStatus>
                                        </tw.BookingIdWrap>
                                        <tw.FlexWrap>
                                            <tw.Pic>
                                                <ImgLoader imageUrl={getThumbnailCFUrl(`/hotel_img/${booking.hotel_id}`)} altText="" />
                                            </tw.Pic>
                                            <tw.HotelInfo>
                                                <tw.HotelTitle>{booking.hotelData.name}</tw.HotelTitle>
                                                <tw.AddressWrap>
                                                    <tw.AddressSVG alt="" src={require("../../../assets/svg/location_icon.svg").default} />
                                                    <tw.HotelAddress onClick={() => openKakaoMapModal(booking.hotelData)}>
                                                        {booking.hotelData.address} {booking.hotelData.address_detail}, {booking.hotelData.postcode}
                                                    </tw.HotelAddress>
                                                </tw.AddressWrap>
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
                                            <tw.MgmtBtn onClick={() => navigate(`./${booking.booking_id}`)}>예약 관리하기</tw.MgmtBtn>
                                        </tw.MgmtBtnWrap>
                                    </tw.BookingWrap>
                                ))}
                            </tw.BookingOuterWrap>
                        ))
                    )}
                </tw.ContentsWrap>
            </tw.MobileWrap>

            {loading && (
                <ModalPortal>
                    <LoadingModal onClose={closeLoadingModal} />
                </ModalPortal>
            )}

            {isKakaoMapModalOpen && selectedHotel && (
                <ModalPortal>
                    <KakaoMapModal
                        hotelName={selectedHotel.name}
                        address={`${selectedHotel.address} ${selectedHotel.address_detail}`}
                        imgUrl={getThumbnailCFUrl(`/hotel_img/${selectedHotel.hotel_id}`)}
                        onClose={closeKakaoMapModal}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
