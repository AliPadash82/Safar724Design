import "../assets/css/dateDiv.css";
import { GlobalSelectedDate } from "../util/GlobalState";
import { useAtom } from "jotai";
interface Props {
  className: string;
  setDisplay: (display: boolean) => void;
}

const DateDiv = ({ className, setDisplay }: Props) => {
  const [selectedDate] = useAtom(GlobalSelectedDate);
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
