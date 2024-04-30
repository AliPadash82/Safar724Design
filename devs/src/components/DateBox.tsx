import { useEffect, useRef } from "react";
import "../assets/css/dateBox.css";
import Calendar from "./Calendar";
import { GlobalDisplayBoolean } from "../util/GlobalState";
import { useAtom } from "jotai";

const DateBox = () => {
  const [display, setDisplay] = useAtom(GlobalDisplayBoolean);
  const dateBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateBoxRef.current && !dateBoxRef.current.contains(event.target as Node)) {
        setDisplay(false); // If click was outside DateBox, close it
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDisplay]);

  return (
    <div
      className="date-box"
      ref={dateBoxRef}
      style={{
        pointerEvents: display ? "auto" : "none",
        opacity: display ? 1 : 0,
        transition: display ? "opacity 0.3s" : "opacity 0.2s",
        direction: "rtl",
      }}>
      <i className="cross" onClick={() => setDisplay(false)} />
      <i className="fas fa-calendar-alt" id="calender" aria-hidden="true">
        <div className="tooltip-message-triangle">▲</div>
        <div className="tooltip-message">date</div>
      </i>
      <h3 style={{ color: "black" }}>تاریخ را انتخاب نمایید</h3>
      <Calendar className="calendar"/>
    </div>
  );
};

export default DateBox;
