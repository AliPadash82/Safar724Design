import React, { useState } from "react";
import "../assets/css/calendar.css";
import { getFirstWeekday, toPersianNum } from "../util/Function";

interface Props {
  className: string;
  setSelectedDate: (date: Date) => void;
}

const Calendar = ({ className, setSelectedDate }: Props) => {
  const [searchDate, setSearchDate] = useState(new Date());
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const firstWeekday = getFirstWeekday(new Date());
  const emptyDays = Array.from({ length: firstWeekday-1 }, (_, index) => <div key={`empty-${index}`} className="day"></div>);
  return (
    <div className={className}>
      <div>
        <i className="fas fa-chevron-left"></i>
        <div className="year-and-month">
          <span> ۱۴۰۰</span>
          <span>فروردین </span>
        </div>
        <i className="fas fa-chevron-right"></i>
      </div>
      <div className="seperator-line-calendar"></div>
      <div className="grid weekdays">
        <div>ش</div>
        <div>ی</div>
        <div>د</div>
        <div>س</div>
        <div>چ</div>
        <div>پ</div>
        <div>ج</div>
      </div>  
      <div className="grid days">
        {emptyDays}
        {days.map((day) => (
          <div key={day} className="day">
            {toPersianNum(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
