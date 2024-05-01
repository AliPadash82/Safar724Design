import { useEffect, useState } from "react";
import "../assets/css/daysTab.css";
import { addDays, getWeekdayName, toPersianNum } from "../util/Function";
import { GlobalSelectedDate } from "../util/GlobalState";
import { useAtom } from "jotai";

const DaysTab = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useAtom(GlobalSelectedDate);
  const [numberOfTabs, setNumberOfTabs] = useState(7);

  const handleChange = (variable: number | Date) => {
    if (typeof variable === "number") setSelectedDate(addDays(selectedDate, variable));
    else setSelectedDate(variable);
  };
  currentDate.setHours(0, 0, 0, 0);
  let startDate;
  if (selectedDate > currentDate) {
    startDate = addDays(selectedDate, -1);
  } else {
    startDate = currentDate;
  }

  const getTabCountBasedOnWidth = () => {
    const width = window.innerWidth;
    if (width < 768) return 3;
    if (width < 1024) return 5;
    return 7;
  };

  useEffect(() => {
    const handleResize = () => setNumberOfTabs(getTabCountBasedOnWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const daysToShow = Array.from({ length: numberOfTabs }, (_, i) => addDays(startDate, i));
  return (
    <div className="days-tab unselectable" style={{ direction: "rtl" }}>
      <div className="days-tab-container">
        <i
          className="fas fa-chevron-right"
          onClick={() => {
            handleChange(-1);
          }}></i>
        {daysToShow.map((date, index) => (
          <div
            key={index}
            className={`specific-day${selectedDate.toDateString() === date.toDateString() ? " selected" : ""}`}
            onClick={() => {
              handleChange(date);
            }}>
            <span className="weekday">{getWeekdayName(date)}</span>
            <span className="date-after-weekday" style={{ margin: "5px" }}>
              {toPersianNum(date.toLocaleDateString("fa-IR", { month: "numeric", day: "numeric" }))}
            </span>
          </div>
        ))}
        <i
          className="fas fa-chevron-left"
          onClick={() => {
            handleChange(1);
          }}></i>
      </div>
    </div>
  );
};

export default DaysTab;
