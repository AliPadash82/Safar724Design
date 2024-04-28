import React from "react";
import s from "../assets/css/refundItem.module.css";

interface Props {
  children: React.ReactNode;
  title: string;
  sign?: string;
}

const RefundItem = ({children, title, sign="%"} : Props) => {
  return (
    <div className={s.refundItem}>
      <div className={s.refundTitle}>
        <span className={s.title}>{title}</span>
        <span className={s.percentage}>{sign}</span>
        <div className={s.triangleLeft} />
      </div>
      <div className={s.refundDescription}>
        <span className={s.description}>{children}</span>
      </div>
    </div>
  );
};

export default RefundItem;
