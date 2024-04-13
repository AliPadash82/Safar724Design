import React from "react";
import "../assets/css/dateDiv.css";

interface Props {
  className: string;
  setDisplay: (display: boolean) => void;
}

const DateDiv = ({ className, setDisplay }: Props) => {
  return (
    <div className={className} onClick={() => setDisplay(true)}>
      <div className="date">
        <span>چهارشنبه</span> <span>۱۵</span> <span>فروردین</span> <span>۱۴۰۳</span>{" "}
      </div>
      <i className="icon-date"></i>
    </div>
  );
};

export default DateDiv;
