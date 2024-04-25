import React from "react";
import s from "../assets/css/busDetails.module.css";
import busFront from "../assets/images/BusFront.png";
import { SeatType } from "../util/Models";
import Seat from "./Seat";

const BusDetails = () => {
  let seatsArray: SeatType[] = [
    [1, "M"],
    [4, "M"],
    [7, null],
    [10, "N"],
    null,
    [14, "F"],
    [17, "F"],
    [20, "M"],
    [23, null],
    [1, "M"],
    [4, "M"],
    [7, null],
    [10, "N"],
    null,
    [14, "F"],
    [17, "F"],
    [20, "M"],
    [23, null],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [1, "M"],
    [4, "M"],
    [7, null],
    [10, "M"],
    [4, "F"],
    [14, "F"],
    [17, "F"],
    [20, "M"],
    [23, null],
  ];
  return (
    <>
      <div className={s.busDetails}>
        <div className={s.dividerLine} />
        <div className={s.cancelationCondition}>
          
        </div>
        <div className={s.busInformation}>
          <div className={s.busSchema}>
            <div className={s.busInner}>
              <div className={s.grid}>
                {seatsArray.map((seat, index) => (
                  <Seat seat={seat} key={index} />
                ))}
              </div>
            </div>
            <img src={busFront} alt="bus front" />
          </div>
          <div className={s.legend}>
            <div>
              <Seat size="20px" seat={[null, "M"]} />
              خریداری شده برای آقایان
            </div>
            <div>
              <Seat size="20px" seat={[null, "F"]} />
              خریداری شده برای بانوان
            </div>
            <div>
              <Seat size="20px" seat={[null, "N"]} />
              غیر قابل خرید
            </div>
            <div>
              <Seat size="20px" seat={[null, null]} />
              قابل خرید
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusDetails;
