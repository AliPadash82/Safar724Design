import React from "react";
import "../assets/css/dateDiv.css";

interface Props {
  className: string;
  setDisplay: (display: boolean) => void;
  selectedDate: Date;
}

const DateDiv = ({ className, setDisplay, selectedDate }: Props) => {
  return (
    <div className={className} onMouseDown={() => setTimeout(() => setDisplay(true))}>
      <div className="date">
        <span>{selectedDate.toLocaleString("fa-IR", { weekday: "long" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { day: "numeric" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { month: "long" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { year: "numeric" })}</span>
      </div>
      <i className="icon-date"></i>
    </div>
  );
};

export default DateDiv;
