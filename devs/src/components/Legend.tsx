import React from "react";
import Seat from "./Seat";

interface Props {
  className: string;
}

const Legend = ({ className }: Props) => {
  return (
    <div className={className}>
      <div>
        <Seat size="20px" seat={[null, "M"]} /> خریداری شده برای آقایان
      </div>
      <div>
        <Seat size="20px" seat={[null, "F"]} /> خریداری شده برای بانوان
      </div>
      <div>
        <Seat size="20px" seat={[null, "N"]} /> غیر قابل خرید
      </div>
      <div>
        <Seat size="20px" seat={[null, null]} /> قابل خرید
      </div>
    </div>
  );
};

export default Legend;
