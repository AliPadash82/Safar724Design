import React, { useEffect, useRef, useState } from "react";
import { Service, ServiceResponse } from "../util/Models";
import { TbClockHour9 } from "react-icons/tb";
import s from "../assets/css/panel.module.css";
import defaultImg from "../assets/images/CompanyDefaultLogo.png";
import { toPersianNum, putComma } from "../util/Function";
import BusDetails from "./BusDetails";

interface Props {
  data: ServiceResponse;
  item: Service;
  index: number;
  visibleCount?: number;
  lastItemRef?: React.LegacyRef<HTMLDivElement>;
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
}

const Panel = ({ data, item, index, trigger, setTrigger }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [numberOfAvailableSeats, setNumberOfAvailableSeats] = useState(item.AvailableSeatCount);
  const [loadingSeatCount, setLoadingSeatCount] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fetchNumberOfAvailableSeats = (serviceID: number) => {
    const url = new URL("http://localhost:8080/api/v1/getnumberofavailableseat");
    url.searchParams.append("ServiceID", serviceID.toString());

    return fetch(url.toString())
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Failed to fetch number of available seats:", err);
        throw err;
      });
  };

  useEffect(() => {
    setNumberOfAvailableSeats(item.AvailableSeatCount);
  }, [data]);

  useEffect(() => {
    if (!showDetails) return;
    setTimeout(() => {
      const yOffset = -90; 
      const y = ref.current?.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } , 500)
    setLoadingSeatCount(true);
    fetchNumberOfAvailableSeats(item.ID)
      .then((result) => {
        console.log("Fetched result:", result);
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
      key={index}
      ref={ref}
      style={{ zIndex: index }}>
      <div className={s.flexRow}>
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
