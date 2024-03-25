import { useState } from 'react';
import dayjs from 'dayjs';

function Calendar() {
    const [date, setDate] = useState(dayjs());
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
        if (date.diff(dayjs(), "month") >= 0) {
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

    const navMonth = (day: any) => {
        if (day < 7) {
            nextMonth();
        } else {
            prevMonth();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-xl font-bold">
                    {viewYear}년 {viewMonth + 1}월
                </h2>
                <div className="mt-4">
                    <button className="px-2 py-1 mx-1 bg-gray-200 text-gray-600 rounded-lg" onClick={prevMonth}>
                        &lt;
                    </button>
                    <button className="px-2 py-1 mx-1 bg-gray-200 text-gray-600 rounded-lg" onClick={goToday}>
                        Today
                    </button>
                    <button className="px-2 py-1 mx-1 bg-gray-200 text-gray-600 rounded-lg" onClick={nextMonth}>
                        &gt;
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap mb-4">
                <div className="w-[14%] text-center">일</div>
                <div className="w-[14%] text-center">월</div>
                <div className="w-[14%] text-center">화</div>
                <div className="w-[14%] text-center">수</div>
                <div className="w-[14%] text-center">목</div>
                <div className="w-[14%] text-center">금</div>
                <div className="w-[14%] text-center">토</div>
            </div>
            <div className="flex flex-wrap w-full">
                {dates.map((date, i) => {
                    const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
                    if (condition === "other") {
                        return (
                            <div key={i} className={`w-[14%] p-2 text-center`} onClick={() => navMonth(date)}>
                                <p className={`text-center text-gray-400`}>{date}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={i}
                                className={`w-[14%] p-2 text-center`}
                                onClick={() => console.log(viewYear, viewMonth + 1, date)}
                            >
                                <p>{date}</p>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default Calendar;
