import React from "react";
import "../assets/css/calendar.css";
import { toPersianNum } from "../util/Function";

interface Props {
  className: string;
}

const Calendar = ({ className }: Props) => {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

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
