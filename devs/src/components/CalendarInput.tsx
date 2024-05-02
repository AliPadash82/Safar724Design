import React from "react";
import "../assets/css/calendarInput.css";
import Calendar from "./Calendar";
import { GlobalDisplayBoolean, GlobalSelectedDate } from "../util/GlobalState";
import { useAtom } from "jotai";

const CalendarInput = () => {
  const [display, setDisplay] = useAtom(GlobalDisplayBoolean);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useAtom(GlobalSelectedDate);
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
  }, [setDisplay]);

  return (
    <div className="calendar-div">
      <div className="calendar-input" onClick={() => setTimeout(() => setDisplay(!display))}>
        <i className="fas fa-calendar" style={{ color: "#555" }} />
        <span>{selectedDate.toLocaleString("fa-IR", { weekday: "long" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { day: "numeric" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { month: "long" })}</span>{" "}
        <span>{selectedDate.toLocaleString("fa-IR", { year: "numeric" })}</span>
      </div>
      <div
        ref={contentRef}
        className={`expandable-card2-content${display ? " show" : ""} calendar`}
        style={{ width: "400px", paddingInline: "0", paddingBottom: "0"}}>
        <Calendar className="calendar-2" />
        <div className="bottom-calendar">
          <div className="crosss unselectable" onClick={() => setDisplay(false)}>
            ×
          </div>
          <div className="today-info" onClick={() => setSelectedDate(today)}>
            <i className="fas fa-share"/>
            <span>امروز،</span>{" "}
            <span>{today.toLocaleString("fa-IR", { weekday: "long" })}</span>{" "}
            <span>{today.toLocaleString("fa-IR", { day: "numeric" })}</span>{" "}
            <span>{today.toLocaleString("fa-IR", { month: "long" })}</span>{" "}
            <span>{today.toLocaleString("fa-IR", { year: "numeric" })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarInput;
