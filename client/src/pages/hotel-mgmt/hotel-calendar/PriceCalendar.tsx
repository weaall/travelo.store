import { useEffect, useState } from "react";
import dayjs from "dayjs";

import * as tw from "./PriceCalendar.styles"
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate, useParams } from "react-router-dom";
import SetDatePriceModal from "../../../hook/modal/set-price-day/SetDatePrice.modal";
import SetMonthPriceModal from "../../../hook/modal/set-price-month/SetMonthPrice.modal";

export default function PriceCalendar({ hotel_id }: { hotel_id: string | undefined }) {
    const navigate = useNavigate();
    const { room_id } = useParams();

    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);

    const openMonthModal = () => {
        setIsMonthModalOpen(true);
    };

    const closeMonthModal = () => {
        setIsMonthModalOpen(false);
        fetchPrice();
    };

    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<number>(0);

    const openDateModal = () => {
        setIsDateModalOpen(true);
    };

    const closeDateModal = () => {
        setIsDateModalOpen(false);
        fetchPrice();
    };

    const [date, setDate] = useState(dayjs());

    const [priceData, setPriceData] = useState([
        {
            date: "",
            price: 0,
            room_current: 0,
            room_limit: 0,
        },
    ]);

    const [roomData, setRoomData] = useState({
        id: 0,
        name: "",
        num: 0,
        bed_type_id: 0,
        bed_type: "",
        view_type_id: 0,
        view_type: "",
    });

    const fetchRoomInfo = async () => {
        try {
            const response = await axiosInstance.get("/room/" + room_id);
            const fetchedData = response.data.data[0];
            setRoomData(fetchedData);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        }
    };

    const viewYear = date.year();
    const viewMonth = date.month();

    const prevLast = date.subtract(1, "month").endOf("month");
    const thisLast = date.endOf("month");

    const PLDate = prevLast.date();
    const PLDay = prevLast.day();

    const TLDate = thisLast.date();
    const TLDay = thisLast.day();

    const prevDates = [];
    const thisDates = Array.from({ length: TLDate }, (_, i) => i + 1);
    const nextDates = Array.from({ length: 6 - TLDay }, (_, i) => i + 1);

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    const prevMonth = () => {
        if (date.isAfter(dayjs(), 'month')) {
            setDate(date.subtract(1, "month"));
        }
    };
    
    const nextMonth = () => {
        const nextThreeMonths = dayjs().add(3, 'month');
        if (date.isBefore(nextThreeMonths, 'month')) {
            setDate(date.add(1, "month"));
        }
    };

    const goToday = () => {
        setDate(dayjs());
    };

    const navMonth = (day: number) => {
        if (day < 7) {
            nextMonth();
        } else {
            prevMonth();
        }
    };

    const fetchPrice = async () => {
        try {
            const response = await axiosInstance.get("/room/price/" + room_id);
            setPriceData(response.data.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    window.alert("올바른 접근이 아닙니다.");
                    navigate("/main");
                }
            }
        }
    };

    useEffect(() => {
        fetchPrice();
        fetchRoomInfo();
    }, []);

    return (
        <tw.Container>
            <tw.ContentsWrap>
                <tw.ContentsFlex>
                    <tw.Title>가격설정</tw.Title>
                </tw.ContentsFlex>
                <tw.RoomWrap>
                    <tw.ContentsFlex>
                        <tw.RoomName>{roomData.name}</tw.RoomName>
                    </tw.ContentsFlex>
                    <tw.ContentsFlex>
                        <tw.RoomText>숙박인원 : {roomData.num}인</tw.RoomText>
                        <tw.RoomText>{roomData.bed_type}</tw.RoomText>
                        <tw.RoomText>({roomData.view_type})</tw.RoomText>
                    </tw.ContentsFlex>
                </tw.RoomWrap>
                <tw.FlexWrap>
                    <tw.TitleWrap>
                        <tw.YearWrap>
                            <tw.AddBtn onClick={()=>{navigate(-1)}}>뒤로가기</tw.AddBtn>
                            <tw.YearMonth>
                                {viewYear}년 {viewMonth + 1}월
                            </tw.YearMonth>
                            <tw.AddBtn onClick={openMonthModal}>월별설정</tw.AddBtn>
                        </tw.YearWrap>
                        <tw.NavWrap>
                            <tw.NavBtn onClick={prevMonth}>&lt;</tw.NavBtn>
                            <tw.NavBtn onClick={goToday}>Today</tw.NavBtn>
                            <tw.NavBtn onClick={nextMonth}>&gt;</tw.NavBtn>
                        </tw.NavWrap>
                    </tw.TitleWrap>
                </tw.FlexWrap>
                <tw.DaysWrap>
                    {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                        <tw.DayWrap key={index}>
                            <tw.DayLabel $day={index}>{day}</tw.DayLabel>
                        </tw.DayWrap>
                    ))}
                </tw.DaysWrap>
                <tw.DatesWrap>
                    {dates.map((date, i) => {
                        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
                        const formattedDate = dayjs(`${viewYear}-${viewMonth + 1}-${date}`).format("YYYY-MM-DD");
                        const today = dayjs().format("YYYY-MM-DD");
                        const isPastDate = dayjs(formattedDate).isBefore(today, "day");
                        const matchedPriceData = priceData.find((item) => item.date === formattedDate);

                        if (condition === "other") {
                            return (
                                <tw.DateWrap key={i} onClick={() => navMonth(date)}>
                                    <tw.DateLabel $date={condition}>{date}</tw.DateLabel>
                                </tw.DateWrap>
                            );
                        } else if (dayjs(formattedDate).format("YYYY-MM-DD") === today) {
                            return (
                                <tw.TodayWrap
                                    key={i}
                                    onClick={() => {
                                        setSelectedDate(date);
                                        openDateModal();
                                    }}
                                >
                                    <tw.DateLabel $date={"today"}>{date}</tw.DateLabel>
                                    <tw.RoomNum>
                                        {matchedPriceData
                                            ? `${matchedPriceData.room_current} / ${matchedPriceData.room_limit}`
                                            : "0 / 0"}
                                    </tw.RoomNum>
                                    <tw.RoomPrice>{matchedPriceData ? matchedPriceData.price : "미정"}</tw.RoomPrice>
                                </tw.TodayWrap>
                            );
                        } else if (isPastDate) {
                            return (
                                <tw.PastWrap key={i}>
                                    <tw.DateLabel $date={condition}>{date}</tw.DateLabel>
                                    <tw.RoomNum>
                                        {matchedPriceData
                                            ? `${matchedPriceData.room_current} / ${matchedPriceData.room_limit}`
                                            : "0 / 0"}
                                    </tw.RoomNum>
                                    <tw.PastPrice>{matchedPriceData ? matchedPriceData.price : "미정"}</tw.PastPrice>
                                </tw.PastWrap>
                            );
                        } else {
                            return (
                                <tw.DateWrap
                                    key={i}
                                    onClick={() => {
                                        setSelectedDate(date);
                                        openDateModal();
                                    }}
                                >
                                    <tw.DateLabel $date={condition}>{date}</tw.DateLabel>
                                    <tw.RoomNum>
                                        {matchedPriceData
                                            ? `${matchedPriceData.room_current} / ${matchedPriceData.room_limit}`
                                            : "0 / 0"}
                                    </tw.RoomNum>
                                    <tw.RoomPrice>{matchedPriceData ? matchedPriceData.price : "미정"}</tw.RoomPrice>
                                </tw.DateWrap>
                            );
                        }
                    })}
                </tw.DatesWrap>
            </tw.ContentsWrap>

            {isMonthModalOpen && (
                <ModalPortal>
                    <SetMonthPriceModal
                        onClose={closeMonthModal}
                        hotel_id={hotel_id}
                        room_id={room_id}
                        year={viewYear}
                        month={viewMonth + 1}
                    />
                </ModalPortal>
            )}

            {isDateModalOpen && (
                <ModalPortal>
                    <SetDatePriceModal
                        onClose={closeDateModal}
                        hotel_id={hotel_id}
                        room_id={room_id}
                        year={viewYear}
                        month={viewMonth + 1}
                        date={selectedDate}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}

