import "../assets/css/dateDiv.css";
import { GlobalDisplayBoolean, GlobalSelectedDate } from "../util/GlobalState";
import { useAtom } from "jotai";
interface Props {
  className: string;
}

const DateDiv = ({ className }: Props) => {
  const [selectedDate] = useAtom(GlobalSelectedDate);
  const [_, setDisplay] = useAtom(GlobalDisplayBoolean);
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
