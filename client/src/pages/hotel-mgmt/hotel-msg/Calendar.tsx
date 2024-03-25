import React, { useState } from 'react'

export default function Calendar() {
    
    const [date, setDate] = useState(new Date());
    const [viewYear, setViewYear] = useState(date.getFullYear());
    const [viewMonth, setViewMonth] = useState(date.getMonth());
    
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !==6) {
        for (let i = 0; i < PLDay + 1; i++){
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);


    const prevMonth = () => {
        date.setMonth(date.getMonth() - 1);
        setViewMonth(date.getMonth());
    }

    const nextMonth = () => {
        date.setMonth(date.getMonth() + 1);
        setViewMonth(date.getMonth());
    }

    const goToday = () => {
        date.setMonth(new Date().getMonth());
        setViewMonth(date.getMonth());
    }

    const navMonth = (props : any) =>{
        if(props < 7){
            nextMonth();
        }else{
            prevMonth();
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h2>{viewYear}년</h2>
                    <h2>{viewMonth + 1}월</h2>
                    <div>
                        <button onClick={prevMonth}>&lt;</button>
                        <button onClick={goToday}>Today</button>
                        <button onClick={nextMonth}>&gt;</button>
                    </div>
                </div>
                <div>
                    <div>일</div>
                    <div>일</div>
                    <div>일</div>
                    <div>일</div>
                    <div>일</div>
                    <div>일</div>
                    <div>일</div>
                </div>
                <div>
                    {dates.map((date, i) => {
                        dates[i] = date;
                        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                            ? 'this'
                            : 'other';
                        if (condition === 'other') {
                            return (
                                <div onClick={() => navMonth(date)}>{date}</div>
                            )
                        }
                        else {
                            return (
                                <div onClick={() => console.log(viewYear, viewMonth + 1, date)}>{date}</div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}


