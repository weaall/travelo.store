import { useEffect, useState } from "react";
import dayjs from "dayjs";

import * as tw from "./Calendar.styles"
import { ModalPortal } from "../../../hook/modal/ModalPortal";
import SetPriceModal from "../../../hook/modal/set-price/SetPrice.modal";
import { axios, axiosInstance } from "../../../utils/axios.utils";
import { useNavigate } from "react-router-dom";

function Calendar({ hotel_id }: { hotel_id: string | undefined }) {

    const navigate = useNavigate();

    const [isSetModalOpen, setIsSetModalOpen] = useState(false);

    const openSetModal = () => {
        setIsSetModalOpen(true);
      };

    const closeSetModal = () => {
        setIsSetModalOpen(false);
    };

    const [date, setDate] = useState(dayjs());

    const [roomData, setRoomData] = useState({
        id: 0,
        name: "",
        num: 0,
        bed_type_id: 0,
        bed_type: "",
        view_type_id: 0,
        view_type: "",
        discount: 0,
    });

    const [priceData, setPriceData] = useState([{
        date: "",
        price: 0,
        room_current: 0,
        room_limit: 0,
    }])

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
        if (date.diff(dayjs(), "month") > -1) {
            setDate(date.subtract(1, "month"));
        }
    };

    const nextMonth = () => {
        if (date.diff(dayjs(), "month") < 2) {
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
        const response = await axiosInstance .get("/room/price/" + 1);
            setPriceData(response.data.data)
            console.log(response.data.data);
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
    }, []);

    return (
        <tw.Container>
            <tw.FlexWrap>
                <tw.TitleWrap>
                    <tw.YearMonth>
                        {viewYear}년 {viewMonth + 1}월
                    </tw.YearMonth>
                    <tw.NavWrap>
                        <tw.NavBtn onClick={prevMonth}>&lt;</tw.NavBtn>
                        <tw.NavBtn onClick={goToday}>Today</tw.NavBtn>
                        <tw.NavBtn onClick={nextMonth}>&gt;</tw.NavBtn>
                    </tw.NavWrap>
                </tw.TitleWrap>
                <tw.BtnWrap>
                    <tw.AddBtn onClick={openSetModal}>설정</tw.AddBtn>
                </tw.BtnWrap>
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
                            <tw.TodayWrap key={i} onClick={() => console.log(viewYear, viewMonth + 1, date)}>
                                <tw.DateLabel $date={"today"}>{date}</tw.DateLabel>
                                <tw.RoomNum>
                                    {matchedPriceData
                                        ? `${matchedPriceData.room_current} / ${matchedPriceData.room_limit}`
                                        : "0 / 0"}
                                </tw.RoomNum>
                                <tw.RoomPrice>{matchedPriceData ? matchedPriceData.price : ""}</tw.RoomPrice>
                            </tw.TodayWrap>
                        );
                    
                    }else if (isPastDate) {
                        return (
                            <tw.DateWrap key={i}>
                                <tw.DateLabel $date={condition}>{date}</tw.DateLabel>
                                <tw.RoomNum>
                                    {matchedPriceData
                                        ? `${matchedPriceData.room_current} / ${matchedPriceData.room_limit}`
                                        : "0 / 0"}
                                </tw.RoomNum>
                                <tw.RoomPrice>{matchedPriceData ? matchedPriceData.price : "미정"}</tw.RoomPrice>
                            </tw.DateWrap>
                        );
                    } else {
                        return (
                            <tw.DateWrap key={i} onClick={() => console.log(viewYear, viewMonth + 1, date)}>
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

            {isSetModalOpen && (
                <ModalPortal>
                    <SetPriceModal
                        onClose={closeSetModal}
                        hotel_id={hotel_id}
                        room_id={1}
                        year={viewYear}
                        month={viewMonth + 1}
                    />
                </ModalPortal>
            )}
        </tw.Container>
    );
}

export default Calendar;
