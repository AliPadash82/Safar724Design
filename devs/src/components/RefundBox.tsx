import React from "react";
import s from "../assets/css/refundBox.module.css";
import RefundItem from "./RefundItem";
const RefundBox = () => {
  return (
    <div className={s.cancelationCondition}>
      <span>شرایط استرداد</span>
      <div className={s.divider} />
      <RefundItem title="۱۰">از لحظه خرید تا یک ساعت قبل حرکت کسر ۱۰٪ جریمه</RefundItem>
      <RefundItem title="۵۰">از یک ساعت قبل حرکت کسر ۱۰٪ جریمه</RefundItem>
    </div>
  );
};

export default RefundBox;
