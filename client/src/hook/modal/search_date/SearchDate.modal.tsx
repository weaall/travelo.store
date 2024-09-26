import { useState } from "react";
import dayjs from "dayjs";
import * as tw from "./SearchDate.modal.styles";

interface ModalProps {
    onClose: (selectedDates: { startDate: string; endDate: string }) => void;
    startDate: string;
    endDate: string;
}

interface DateProps {
    startDate: string,
    endDate: string,
}

export default function SearchDateModal({ onClose, startDate, endDate }: ModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseClick = ({startDate, endDate} : DateProps) => {
        triggerCloseAnimation({startDate, endDate});
    };

    const triggerCloseAnimation = ({startDate, endDate} : DateProps ) => {
        setIsClosing(true);
        setTimeout(() => {
            onClose({startDate, endDate});
        }, 500);
    };

    const [date, setDate] = useState(dayjs());

    const [dateValue, setDateValue] = useState({
        startDate: startDate,
        endDate: endDate,
    });

    const selectDate = (selectedDate: string) => {
        const isStartDateEmpty = dateValue.startDate === "";
        const isBothDatesSet = dateValue.startDate !== "" && dateValue.endDate !== "";

        if (isStartDateEmpty || isBothDatesSet) {
            setDateValue({
                startDate: selectedDate,
                endDate: "",
            });
        } else {
            const isAfterStartDate = dayjs(selectedDate).isAfter(dateValue.startDate, "day");
            const dateDiff = dayjs(selectedDate).diff(dayjs(dateValue.startDate), "day");

            if (isAfterStartDate && dateDiff <= 8) {
                setDateValue((prevDateValue) => ({
                    ...prevDateValue,
                    endDate: selectedDate,
                }));
            } else if (!isAfterStartDate) {
                setDateValue((prevDateValue) => ({
                    ...prevDateValue,
                    startDate: selectedDate,
                }));
            }
        }
    };

    const validator = () => {
        return dateValue.startDate !== "" && dateValue.endDate !== "";
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
        if (date.isAfter(dayjs(), "month")) {
            setDate(date.subtract(1, "month"));
        }
    };

    const nextMonth = () => {
        const nextThreeMonths = dayjs().add(3, "month");
        if (date.isBefore(nextThreeMonths, "month")) {
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

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={() => handleCloseClick({ startDate, endDate })}>
                        <tw.CloseSVG alt="" src={require("../../../assets/svg/close_svg.svg").default}></tw.CloseSVG>
                    </tw.CloseBtn>
                    <tw.Title>날짜 선택</tw.Title>
                </tw.TitleWrap>

                <tw.CalendarWrap>
                    <tw.CalTitleWrap>
                        <tw.YearWrap>
                            <tw.YearMonth>
                                {viewYear}. {viewMonth + 1}
                            </tw.YearMonth>
                        </tw.YearWrap>
                        <tw.NavWrap>
                            <tw.NavBtn onClick={prevMonth}>
                                <tw.NavSvg alt="" src={require("../../../assets/svg/calendar_minus_icon.svg").default} />
                            </tw.NavBtn>
                            <tw.NavBtn onClick={goToday}>
                                <tw.NavSvg alt="" src={require("../../../assets/svg/calendar_today_icon.svg").default} />
                            </tw.NavBtn>
                            <tw.NavBtn onClick={nextMonth}>
                                <tw.NavSvg alt="" src={require("../../../assets/svg/calendar_plus_icon.svg").default} />
                            </tw.NavBtn>
                        </tw.NavWrap>
                    </tw.CalTitleWrap>

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

                            const getDateStyle = () => {
                                if (formattedDate === dateValue.startDate) return "startDate";
                                if (formattedDate === dateValue.endDate) return "endDate";
                                if (
                                    dayjs(dateValue.startDate) &&
                                    dayjs(dateValue.endDate) &&
                                    dayjs(formattedDate).isAfter(dayjs(dateValue.startDate)) &&
                                    dayjs(formattedDate).isBefore(dayjs(dateValue.endDate))
                                )
                                    return "betweenDate";
                                return "other";
                            };

                            const isDisabled = dateValue.startDate && dayjs(formattedDate).diff(dayjs(dateValue.startDate), "day") > 8;

                            if (condition === "other") {
                                return (
                                    <tw.DateWrap $date={"other"} key={i} onClick={() => navMonth(date)}>
                                        <tw.DateLabel $date={condition}>{date}</tw.DateLabel>
                                    </tw.DateWrap>
                                );
                            } else if (formattedDate === today) {
                                return (
                                    <tw.DateWrap
                                        $date={getDateStyle()}
                                        key={i}
                                        onClick={() => {
                                            selectDate(formattedDate);
                                        }}
                                    >
                                        <tw.DateLabel $date={"today"}>{date}</tw.DateLabel>
                                    </tw.DateWrap>
                                );
                            } else if (isPastDate) {
                                return (
                                    <tw.PastWrap key={i}>
                                        <tw.DateLabel $date={condition}>{date}</tw.DateLabel>
                                    </tw.PastWrap>
                                );
                            } else {
                                return (
                                    <tw.DateWrap
                                        $date={getDateStyle()}
                                        key={i}
                                        onClick={() => {
                                            if (!isDisabled || dateValue.endDate) selectDate(formattedDate);
                                        }}
                                        style={isDisabled && !dateValue.endDate ? { pointerEvents: "none", opacity: 0.5 } : {}}
                                    >
                                        <tw.DateLabel $date={condition}>{date}</tw.DateLabel>
                                    </tw.DateWrap>
                                );
                            }
                        })}
                    </tw.DatesWrap>

                    <tw.SelectWrap>
                        <tw.StartWrap>
                            <tw.UpperTag>체크인</tw.UpperTag>
                            <tw.SelectLabel>{dateValue.startDate}</tw.SelectLabel>
                        </tw.StartWrap>
                        <tw.EndWrap>
                            <tw.UpperTag>체크아웃</tw.UpperTag>
                            <tw.SelectLabel>{dateValue.endDate}</tw.SelectLabel>
                        </tw.EndWrap>
                    </tw.SelectWrap>
                </tw.CalendarWrap>

                <tw.RegWrap>
                    <tw.RegBtn onClick={() => handleCloseClick(dateValue)} $validator={validator()} disabled={!validator()}>
                        확인
                    </tw.RegBtn>
                </tw.RegWrap>
            </tw.ModalWrap>
        </tw.Container>
    );
}
