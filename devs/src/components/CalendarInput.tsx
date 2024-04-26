import React from "react";
import "../assets/css/calendarInput.css";
import Calendar from "./Calendar";

interface Props {
  display: boolean;
  setDisplay: (display: boolean) => void;
  setSelectedDate: (date: Date) => void;
  selectedDate: Date;
}

const CalendarInput = ({ display, setDisplay, setSelectedDate, selectedDate}: Props) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const handleClick = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      setDisplay(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className="calendar-div">
      <div className="calendar-input" onClick={() => setTimeout(() => setDisplay(!display))}>
        <i className="fas fa-calendar" />
        <span>{selectedDate.toLocaleString("fa-IR", { weekday: "long" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { day: "numeric" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { month: "long" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { year: "numeric" })}</span>
      </div>
      <div
        ref={contentRef}
        className={`expandable-card2-content${display ? " show" : ""}`}
        style={{ width: "400px", paddingInline: "0", paddingBottom: "0" }}>
        <Calendar className="calendar-2" setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
        <div className="bottom-calendar">
          <div className="crosss unselectable" onClick={() => setDisplay(false)}>
            ×
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarInput;
