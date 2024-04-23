import "../assets/css/daysTab.css";
import { toPersianNum } from "../util/Function";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getWeekdayName = (date: Date): string => {
  return date.toLocaleDateString("fa-IR", { weekday: "long" });
};

const DaysTab = ({ selectedDate, setSelectedDate }: Props) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  let startDate;
  if (selectedDate > currentDate) {
    startDate = addDays(selectedDate, -1);
  } else {
    startDate = currentDate;
  }

  const daysToShow = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="days-tab unselectable" style={{ direction: "rtl" }}>
      <div className="days-tab-container">
        <i className="fas fa-chevron-right" onClick={() => setSelectedDate(addDays(selectedDate, -7))}></i>
        {daysToShow.map((date, index) => (
          <div key={index} className={`specific-day${selectedDate.toDateString() === date.toDateString() ? " selected" : ""}`} onClick={() => setSelectedDate(date)}>
            <span className="weekday">{getWeekdayName(date)}</span>
            <span className="date-after-weekday" style={{margin: "5px"}}>
              {toPersianNum(date.toLocaleDateString("fa-IR", { month: "numeric", day: "numeric" }))}
            </span>
          </div>
        ))}
        <i className="fas fa-chevron-left" onClick={() => setSelectedDate(addDays(selectedDate, 7))}></i>
      </div>
    </div>
  );
};

export default DaysTab;
