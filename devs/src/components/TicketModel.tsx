import React from "react";
import s from "../assets/css/ticketModel.module.css";
import img from "../assets/images/reserve.svg"

const TicketModel = () => {
  return (
    <div className={s.ticketModel}>
      <div className={s.whole}>
        <div className={s.blueHeader}>
          <div className={s.title}>
            <h6>در حال هماهنگی</h6>
            <p>برای ایجاد سرویس اتوبوسی در این مسیر هستیم</p>
          </div>
          <img src={img} alt="logo"/>
          <div className={s.dash}/>
          <div className={s.right}/>
          <div className={s.left}/>
        </div>
        <div className={s.theBody}>
          <h5>در صورت نبود سرویس یا صندلی خالی، می‌توانید در سامانه اطلاع‌رسانی <br/> ثبت‌نام کنید تا از سرویس‌های جدید اطلاع پیدا کنید</h5>
        </div>
      </div>
    </div>
  );
};

export default TicketModel;
