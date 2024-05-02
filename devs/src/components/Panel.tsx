import React, { useEffect, useRef, useState } from "react";
import { Service } from "../util/Models";
import { TbClockHour9 } from "react-icons/tb";
import s from "../assets/css/panel.module.css";
import defaultImg from "../assets/images/CompanyDefaultLogo.png";
import { toPersianNum, putComma } from "../util/Function";
import BusDetails from "./BusDetails";
import { fetchNumberOfAvailableSeats } from "../util/FetchFunction";
import { useAtom } from "jotai";
import { GlobalServiceData } from "../util/GlobalState";

interface Props {
  item: Service;
  visibleCount?: number;
  lastItemRef?: React.LegacyRef<HTMLDivElement>;
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
  index?: number;
}

const Panel = ({ item, trigger, setTrigger, index=0 }: Props) => {
  const [servicesData] = useAtom(GlobalServiceData);
  const [showDetails, setShowDetails] = useState(false);
  const [numberOfAvailableSeats, setNumberOfAvailableSeats] = useState(item.AvailableSeatCount);
  const [loadingSeatCount, setLoadingSeatCount] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNumberOfAvailableSeats(item.AvailableSeatCount);
  }, [servicesData]);

  useEffect(() => {
    if (!showDetails) return;
    setTimeout(() => {
      const yOffset = -90; 
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } , 350)
    setLoadingSeatCount(true);
    fetchNumberOfAvailableSeats(item.ID)
      .then((result) => {
        setNumberOfAvailableSeats(result);
        setLoadingSeatCount(false);
      })
      .catch((err) => {
        console.error("Error fetching details:", err);
        setLoadingSeatCount(false);
      });
  }, [showDetails, item.ID]);
  return (
    <div
      className={s.panel}
      ref={ref}
      style={{ animationDuration: `${Math.min(index * 0.05 + 0.3, 0.6)}s` }}
      >
      <div className={s.flexRow}>
        <div className={s.companyLogo}>
          <img src={item.CompanyLogo} alt="CompanyLogo" onError={(e) => (e.currentTarget.src = defaultImg)} />
          <span>{item.CompanyPersianName}</span>
        </div>
        <div className={s.info}>
          <h6>نوع اتوبوس {item.BusType}</h6>
          <div className={s.inner}>
            <div className={s.od}>
              {servicesData?.OriginPersianName + " - پایانه " + item.OriginTerminalPersianName}
              <i className="fas fa-arrow-left" />
              {servicesData?.DestinationPersianName + " - پایانه " + item.DestinationTerminalPersianName}
            </div>
            <div className={s.departureTime}>
              {toPersianNum(item.DepartureTime)}
              <TbClockHour9 className={s.iconClock} />
            </div>
            <div className={s.price}>
              {toPersianNum(putComma(item.Price))} <span> ریال</span>
            </div>
            <div className={s.buy}>
              <button onClick={() => setShowDetails(!showDetails)}>مشاهده و خرید</button>
              <span>
                تعداد صندلی های خالی:
                <span className={s.availableSeatCount}>
                  {!loadingSeatCount ? toPersianNum(numberOfAvailableSeats) : <i className="fas fa-spinner"></i>}
                </span>
              </span>
            </div>
          </div>
          {item.Description && <div className={s.divider}></div>}
          {item.Description && <div className={s.description}>{item.Description}</div>}
          {!item.Description && <div style={{ height: "30px" }}></div>}
        </div>
      </div>
      <BusDetails
        serviceID={item.ID}
        busCode={item.BusCode}
        showDetails={showDetails}
        trigger={trigger}
        setTrigger={setTrigger}
        setShowDetails={setShowDetails}
      />
    </div>
  );
};

export default Panel;
