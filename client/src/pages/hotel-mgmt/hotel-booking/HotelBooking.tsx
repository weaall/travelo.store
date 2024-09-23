import React, { useCallback, useEffect, useState } from "react"; // 추가된 import
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { ModalPortal } from "../../../hook/modal/ModalPortal";
import LoadingModal from "../../../hook/modal/loading/Loading.modal";
import SetBookingStatusModal from "../../../hook/modal/set-booking-status/SetBookingStatus.modal";

import { sendJWT } from "../../../utils/jwtUtils";
import { axiosInstance, handleAxiosError } from "../../../utils/axios.utils";

import * as tw from "./HotelBooking.styles";

interface Booking {
    booking_id: string;
    hotel_id: number;
    room_id: number;
    user_id: number;
    total_price: number;
    payment_date: string;
    check_in: string;
    check_out: string;
    name: string;
    mobile: string;
    email: string;
    review: number;
    status: number;
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

    const today = dayjs().format("YYYY-MM-DD");

    const [loading, setLoading] = useState(true);
    const [sortMethod, setSortMethod] = useState<string>("예약날짜");
    const [bookingData, setBookingData] = useState<Booking[]>([]);
    const [startDate, setStartDate] = useState(dayjs().subtract(1, "month").format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [filterState, setFilterState] = useState<number | null>(null);

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoading(true);
    };
    const closeLoadingModal = () => {
        setLoading(false);
    };

    const fetchRooms = useCallback(async (): Promise<RoomList[]> => {
        try {
            const response = await axiosInstance.get("/room/hotel/" + hotel_id);
            const rooms = response.data.data;
            return rooms;
        } catch (error) {
            handleAxiosError(error, navigate);
            return [];
        }
    }, [hotel_id, navigate]);

    const fetchBooking = useCallback(async () => {
        openLoadingModal();
        try {
            const rooms = await fetchRooms();

            const config = await sendJWT({
                method: "GET",
                url: `/booking/hotel/` + hotel_id,
            });

            const response = await axiosInstance.request(config);
            const bookings: Booking[] = response.data.data;

            const updatedBookings = bookings.map((booking) => {
                const roomData = rooms.find((room) => room.id === booking.room_id) || null;
                return { ...booking, RoomData: roomData };
            });

            setBookingData(updatedBookings);
        } catch (error) {
            handleAxiosError(error, navigate);
        } finally {
            closeLoadingModal();
        }
    }, [navigate, hotel_id, fetchRooms]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBooking();
    }, [fetchBooking]);

    const handleSort = (method: string) => {
        setSortMethod(method);
    };

    const handleStateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = e.target.value === "전체" ? null : Number(e.target.value);
        setFilterState(selectedState);
    };

    const getFilteredAndSortedData = () => {
        const filteredBookingData = bookingData.filter((booking) => {
            const bookingDate = dayjs(booking.payment_date);

            const dateMatch =
                (sortMethod === "예약날짜" && bookingDate.isAfter(dayjs(startDate).subtract(1, "day")) && bookingDate.isBefore(dayjs(endDate).add(1, "day"))) ||
                (sortMethod === "체크인" &&
                    dayjs(booking.check_in).isAfter(dayjs(startDate).subtract(1, "day")) &&
                    dayjs(booking.check_in).isBefore(dayjs(endDate).add(1, "day"))) ||
                (sortMethod === "체크아웃" &&
                    dayjs(booking.check_out).isAfter(dayjs(startDate).subtract(1, "day")) &&
                    dayjs(booking.check_out).isBefore(dayjs(endDate).add(1, "day")));

            const stateMatch = filterState === null || booking.status === filterState;

            return dateMatch && stateMatch;
        });

        return [...filteredBookingData].sort((a, b) => {
            if (sortMethod === "예약날짜") {
                return dayjs(a.payment_date).isBefore(dayjs(b.payment_date)) ? 1 : -1;
            } else if (sortMethod === "체크인") {
                return dayjs(a.check_in).isBefore(dayjs(b.check_in)) ? -1 : 1;
            } else if (sortMethod === "체크아웃") {
                return dayjs(a.check_out).isBefore(dayjs(b.check_out)) ? -1 : 1;
            }
            return 0;
        });
    };

    const sortedBookingData = getFilteredAndSortedData();

    const openStatusModal = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const closeStatusModal = () => {
        setSelectedBooking(null);
        setIsModalOpen(false);
    };

    return (
        <tw.Container>
            <tw.MobileWrap>
                <tw.TitleWrap>
                    <tw.Title>예약관리</tw.Title>
                </tw.TitleWrap>

                <tw.FilterWrap>
                    <tw.DateFilterWrap>
                        <tw.DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />~
                        <tw.DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} max={today} />
                    </tw.DateFilterWrap>

                    <tw.SelectFilter onChange={handleStateFilterChange}>
                        <tw.Option value="전체">전체</tw.Option>
                        <tw.Option value="0">미결제</tw.Option>
                        <tw.Option value="1">결제완료</tw.Option>
                        <tw.Option value="2">예약확정</tw.Option>
                        <tw.Option value="3">취소요청</tw.Option>
                        <tw.Option value="4">취소</tw.Option>
                    </tw.SelectFilter>
                </tw.FilterWrap>

                <tw.ContentsWrap>
                    <tw.Table>
                        <tw.Thead>
                            <tw.Tr>
                                <tw.Th $active={sortMethod === "예약날짜"} onClick={() => handleSort("예약날짜")}>
                                    예약날짜
                                </tw.Th>
                                <tw.Th $active={sortMethod === "체크인"} onClick={() => handleSort("체크인")}>
                                    체크인
                                </tw.Th>
                                <tw.Th $active={sortMethod === "체크아웃"} onClick={() => handleSort("체크아웃")}>
                                    체크아웃
                                </tw.Th>
                                <tw.Th $active={false}>예약상태</tw.Th>
                            </tw.Tr>
                        </tw.Thead>
                        {sortedBookingData.map((booking: Booking) => (
                            <tw.Tbody key={booking.booking_id}>
                                <tw.Tr>
                                    <tw.Td>{dayjs(booking.payment_date).format("YYYY-MM-DD")}</tw.Td>
                                    <tw.Td>{booking.check_in}</tw.Td>
                                    <tw.Td>{booking.check_out}</tw.Td>
                                    <tw.TdState $state={booking.status}>
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
                                    </tw.TdState>
                                </tw.Tr>
                                <tw.Tr>
                                    <tw.Td>{booking.booking_id}</tw.Td>
                                    <tw.Td>{booking.name}</tw.Td>
                                    <tw.Td>{booking.mobile}</tw.Td>
                                    <tw.Td>{booking.total_price.toLocaleString()}원</tw.Td>
                                </tw.Tr>
                                <tw.Tr>
                                    <tw.Td>{booking?.RoomData?.name}</tw.Td>
                                    <tw.Td>{booking?.RoomData?.bed_type}</tw.Td>
                                    <tw.Td>{booking?.RoomData?.view_type}</tw.Td>
                                    <tw.TdBtn onClick={() => openStatusModal(booking)}>예약상태관리</tw.TdBtn>
                                </tw.Tr>
                            </tw.Tbody>
                        ))}
                    </tw.Table>
                </tw.ContentsWrap>
            </tw.MobileWrap>

            {loading && (
                <ModalPortal>
                    <LoadingModal onClose={closeLoadingModal} />
                </ModalPortal>
            )}

            {isModalOpen && selectedBooking && (
                <ModalPortal>
                    <SetBookingStatusModal
                        bookingId={selectedBooking.booking_id}
                        hotelId={selectedBooking.hotel_id}
                        status={selectedBooking.status}
                        checkInDate={selectedBooking.check_in}
                        userId={selectedBooking.user_id}
                        onClose={closeStatusModal}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}
