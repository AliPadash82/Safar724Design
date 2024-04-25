import React from "react";
import s from "../assets/css/dummyPanel.module.css";

interface Props {
  index: number;
}

const DummyPanel = ({ index }: Props) => {
  return (
    <div className={s.dummyPanel} key={index}>
      <div className={s.dummyCover} />
      <div className={s.dummyCompanyLogo}>
        <span></span>
      </div>
      <div className={s.dummyInfo}>
        <div className={s.dummyInner}>
          <div className={s.dummyOd} />
          <div className={s.dummyDepartureTime} />
          <div className={s.dummyPrice} />
          <div className={s.dummyBuy} />
        </div>
        <div className={s.dummyDivider} />
      </div>
    </div>
  );
};

export default DummyPanel;
