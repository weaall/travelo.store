import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { ModalPortal } from "../../../hook/modal/ModalPortal";
import LoadingModal from "../../../hook/modal/loading/Loading.modal";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";

import * as tw from "./HotelBooking.styles";

interface Booking {
    booking_id: string;
    hotel_id: number;
    room_id: number;
    total_price: number;
    check_in: string;
    check_out: string;
    name: string;
    mobile: string;
    email: string;
    review: number;
    RoomData: RoomData | null;
}

interface RoomData {
    name: string;
    num: number;
    bed_type: string;
    view_type: string;
}

interface RoomList {
    id: number;
    name: string;
    num: number;
    bed_type_id: number;
    bed_type: string;
    view_type_id: number;
    view_type: string;
}

export default function HotelBookingPage({ hotel_id }: { hotel_id: string | undefined }) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const openLoadingModal = () => {
        setLoading(true);
    };
    const closeLoadingModal = () => {
        setLoading(false);
    };

    const [bookingData, setBookingData] = useState<Booking[]>([]);
    const [displayCount, setDisplayCount] = useState(5)
    const [roomList, setRoomList] = useState<RoomList[]>([]);

    const fetchRooms = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/room/hotel/" + hotel_id);
            const rooms = response.data.data;
            setRoomList(rooms);
        } catch (error) {
            handleAxiosError(error, navigate);
        }
    }, [hotel_id, navigate]);

    const fetchBooking = useCallback(async () => {
        openLoadingModal();
        try {
            const config = await sendJWT({
                method: "GET",
                url: `/booking/hotel/`+ hotel_id,
            });

            const response = await axiosInstance.request(config);
            const bookings: Booking[] = response.data.data;

            const updatedBookings = bookings.map((booking) => {
                const roomData = roomList.find((room) => room.id === booking.room_id) || null; // 일치하는 RoomData 찾기
                return { ...booking, RoomData: roomData }; 
            });

            setBookingData(updatedBookings);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    },[navigate, roomList, hotel_id]);

    useEffect(() => {
        fetchRooms().then(fetchBooking);
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
        return new Date(b.check_in).getTime() - new Date(a.check_in).getTime();
    });

    const groupedBookings = groupByCheckInDate(sortedBookingData.slice(0, displayCount));

    const handleShowMore = () => {
        setDisplayCount((prevCount) => prevCount + 5);
    };

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>이용후기</tw.Title>
                </tw.TitleWrap>
                <tw.ContentsWrap>
                    {Object.keys(groupedBookings).length === 0 ? (
                        <tw.NoBookingWrap>
                            <tw.NoBookingText>다녀온 여행이 없어요!</tw.NoBookingText>
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
                                        </tw.BookingIdWrap>
                                        <tw.FlexWrap>
                                            <tw.HotelInfo>
                                                <tw.RoomName>{booking.RoomData?.name}</tw.RoomName>
                                                <tw.RoomName>{booking.name}</tw.RoomName>
                                                <tw.RoomName>{booking.email}</tw.RoomName>
                                                <tw.RoomName>{booking.mobile}</tw.RoomName>
                                            </tw.HotelInfo>
                                        </tw.FlexWrap>
                                        <tw.MgmtBtnWrap>
                                            <tw.MgmtBtn>메세지 보내기</tw.MgmtBtn>
                                        </tw.MgmtBtnWrap>
                                    </tw.BookingWrap>
                                ))}
                            </tw.BookingOuterWrap>
                        ))
                    )}
                </tw.ContentsWrap>
                {displayCount < sortedBookingData.length && (
                    <tw.ShowMoreWrap>
                        <tw.ShowMoreBtn onClick={handleShowMore}>더 보기</tw.ShowMoreBtn>
                    </tw.ShowMoreWrap>
                )}
            </tw.MobileWrap>

            {loading && (
                <ModalPortal>
                    <LoadingModal onClose={closeLoadingModal} />
                </ModalPortal>
            )}

        </tw.Container>
    );
}
