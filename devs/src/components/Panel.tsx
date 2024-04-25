import React from "react";
import { Service, ServiceResponse } from "../util/Models";
import { TbClockHour9 } from "react-icons/tb";
import s from "../assets/css/panel.module.css";
import defaultImg from "../assets/images/CompanyDefaultLogo.png";
import { toPersianNum, putComma } from "../util/Function";

interface Props {
  data: ServiceResponse;
  item: Service;
  index: number;
  visibleCount: number;
  lastItemRef: React.LegacyRef<HTMLDivElement>;
}

const Panel = ({ data, item, index, visibleCount, lastItemRef }: Props) => {
  return (
    <div className={s.panel} key={index} ref={index === visibleCount - 1 ? lastItemRef : null}>
      <div className={s.companyLogo}>
        <img src={item.CompanyLogo} alt="CompanyLogo" onError={(e) => (e.currentTarget.src = defaultImg)} />
        <span>{item.CompanyPersianName}</span>
      </div>
      <div className={s.info}>
        <h6>نوع اتوبوس {item.BusType}</h6>
        <div className={s.inner}>
          <div className={s.od}>
            {data.OriginPersianName + " - پایانه " + item.OriginTerminalPersianName}
            <i className="fas fa-arrow-left" />
            {data.DestinationPersianName + " - پایانه " + item.DestinationTerminalPersianName}
          </div>
          <div className={s.departureTime}>
            {toPersianNum(item.DepartureTime)}
            <TbClockHour9 className={s.iconClock} />
          </div>
          <div className={s.price}>
            {toPersianNum(putComma(item.Price))} <span> ریال</span>
          </div>
          <div className={s.buy}>
            <button>مشاهده و خرید</button>
            <span className={s.availableSeatCount}>تعداد صندلی های خالی: {toPersianNum(item.AvailableSeatCount)}</span>
          </div>
        </div>
        {item.Description && <div className={s.divider}></div>}
        {item.Description && <div className={s.description}>{item.Description}</div>}
        {!item.Description && <div style={{ height: "30px" }}></div>}
      </div>
    </div>
  );
};

export default Panel;
