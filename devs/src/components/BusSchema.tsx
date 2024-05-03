import s from "../assets/css/busSchema.module.css";
import Seat from "./Seat";
import busFront from "../assets/images/BusFront.png";
import { SeatType } from "../util/Models";

interface Props {
  convertedSeatsArray: SeatType[];
  column: number;
  className?: string;
  blur?: boolean;
}

const BusSchema = ({ convertedSeatsArray, column, className="" , blur=false }: Props) => {
  return (
    <div className={s.busSchema + " " + className + " unselectable"} style={{filter: blur ? "blur(2px)" : ""}}>
      <div className={s.busInner}>
        <div className={s.grid} style={{ gridTemplateColumns: `repeat(${column}, 1fr)` }}>
          {convertedSeatsArray.map((seat, index) => (
            <Seat seat={seat} key={index} />
          ))}
        </div>
      </div>
      <img src={busFront} alt="bus front" />
    </div>
  );
};

export default BusSchema;
