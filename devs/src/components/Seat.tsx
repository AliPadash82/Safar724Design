import React from "react";
import { toPersianNum } from "../util/Function";
import { SeatType } from "../util/Models";

interface Props {
  seat: SeatType;
  size?: string;
}

const Seat = ({ seat, size="27px" }: Props) => {
  return seat == null ? (
    <div />
  ) : (
    <div
      className="seat"
      style={{
        backgroundColor:
          seat[1] == "M"
            ? "#aee2fa"
            : seat[1] == "F"
            ? "#ffb2d3"
            : seat[1] == null
            ? "white"
            : seat[1] == "N"
            ? "#C5C5C5"
            : "black",
        color:  seat[1] == null ? "#22819c" : seat[1] == "N" ? "#777"  : "white",
        margin: "4px auto",
        borderRadius: "5px",
        fontWeight: "bold",
        lineHeight: "29px",
        width: size,
        height: size,
        fontSize: "11px",
        textAlign: "center",
        boxSizing: "border-box",
        border: seat[1] == null ? "1px solid silver" : "none",
      }}>
      {seat[0] && toPersianNum(seat[0])}
    </div>
  );
};

export default Seat;
