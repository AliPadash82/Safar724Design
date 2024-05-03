import { useEffect, useState } from "react";
import s from "../assets/css/refundBox.module.css";
import RefundItem from "./RefundItem";
import AlertBox from "./AlertBox";
const RefundBox = () => {
  const [showCondition, setShowCondition] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if(!showCondition) setTimeout(() => setRender(false), 600);
    else setRender(true);
  }, [showCondition])

  return screenWidth < 1024 ? (
    <>
      <button className={s.seeCondition} onClick={() => setShowCondition(!showCondition)}>
        مشاهده شرایط استرداد
      </button>
      {render && (
        <AlertBox title="شرایط استرداد" setShowCondition={setShowCondition} showCondition={showCondition}>
          <p>
            در صورت کنسلی بلیط به صورت آنلاین توسط شما، هزینه استرداد طبق شرایط زیر توسط شرکت مسافربری از مبلغ بلیط کسر
            خواهد شد.
          </p>
          <div className={s.cancelationCondition}>
            <RefundItem title="۱۰">از لحظه خرید تا یک ساعت قبل حرکت کسر ۱۰٪ جریمه</RefundItem>
            <RefundItem title="۵۰">از یک ساعت قبل حرکت کسر ۱۰٪ جریمه</RefundItem>
          </div>
        </AlertBox>
      )}
    </>
  ) : (
    <div className={s.cancelationCondition}>
      <span>شرایط استرداد</span>
      <div className={s.divider} />
      <RefundItem title="۱۰">از لحظه خرید تا یک ساعت قبل حرکت کسر ۱۰٪ جریمه</RefundItem>
      <RefundItem title="۵۰">از یک ساعت قبل حرکت کسر ۱۰٪ جریمه</RefundItem>
    </div>
  );
};

export default RefundBox;
