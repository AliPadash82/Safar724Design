import { useEffect, useState } from "react";
import { ServiceResponse } from "../util/Models";
import s from "../assets/css/servicesDisplay.module.css";
import rawData from "../util/serviceResponse.json";
import { TbClockHour9 } from "react-icons/tb";
import { toPersianNum, putComma, dateReverse, turnTimeToInteger } from "../util/Function";

interface Props {
  sortBasedOnPrice: boolean;
  checkedState: { [key: string]: boolean };
  originState: { [key: string]: boolean };
  destinationState: { [key: string]: boolean };
}

const ServicesDisplay = ({ sortBasedOnPrice, checkedState, originState, destinationState }: Props) => {
  const [dataBasedOnPrice, setDataBasedOnPrice] = useState<ServiceResponse | null>(null);
  const [dataBasedOnHour, setDataBasedOnHour] = useState<ServiceResponse | null>(null);
  const [minDepartureTime, setMinDepartureTime] = useState<string>("00:00");
  const [maxDepartureTime, setMaxDepartureTime] = useState<string>("00:00");
  const [data, setData] = useState<ServiceResponse | null>(null);

  const setMaxAndMin = (filtered: any) => {
    try {
      let minTime = filtered.Items[0].DepartureTime;
      let maxTime = filtered.Items[0].DepartureTime;
      data?.Items.forEach((item) => {
        if (turnTimeToInteger(item.DepartureTime) < turnTimeToInteger(minTime)) minTime = item.DepartureTime;
        if (turnTimeToInteger(item.DepartureTime) > turnTimeToInteger(maxTime)) maxTime = item.DepartureTime;
      });
      setMinDepartureTime(minTime);
      setMaxDepartureTime(maxTime);
    } catch (e) {
      console.log("setMinAndMax Error:", e);
    }
  };

  useEffect(() => {
    if (!rawData || rawData.Items.length === 0) {
      setDataBasedOnPrice(null);
    }
    const clonedDataHour = JSON.parse(JSON.stringify(rawData));
    clonedDataHour.Items.sort(
      (a: any, b: any) => turnTimeToInteger(a.DepartureTime) - turnTimeToInteger(b.DepartureTime)
    );
    setDataBasedOnHour(clonedDataHour);
  }, []);

  useEffect(() => {
    if (!dataBasedOnPrice) {
      const clonedDataPrice = JSON.parse(JSON.stringify(rawData));
      clonedDataPrice.Items.sort((a: any, b: any) => a.Price - b.Price);
      setDataBasedOnPrice(clonedDataPrice);
    }
    const filtered = {
      ...(sortBasedOnPrice ? dataBasedOnPrice : dataBasedOnHour),
      Items: (sortBasedOnPrice ? dataBasedOnPrice : dataBasedOnHour)?.Items.filter(
        (item) =>
          (checkedState["all"] || checkedState[item.CompanyId.toString()]) &&
          (originState["all"] || originState[item.OriginTerminalCode]) &&
          (destinationState["all"] || destinationState[item.DestinationTerminalCode])
      ),
    };
    setMaxAndMin(filtered);
    setData(filtered);
  }, [checkedState, originState, destinationState, dataBasedOnPrice, dataBasedOnHour, sortBasedOnPrice]);

  if (!data) return <p> error fetching data</p>;
  else if (!data.Items || data.Items.length === 0)
    return (
      <p className={s["no-service-alert"]}>
        {`متاسفانه بلیط اتوبوس ${data.OriginPersianName} به ${data.DestinationPersianName} در تاریخ ${toPersianNum(
          dateReverse(data.Date)
        )} وجود ندارد.`}
        <br />
        {`برای خرید بلیط اتوبوس و مشاهده قیمت، ساعات حرکت و اتوبوس های مسیر ${data.OriginPersianName} ${data.DestinationPersianName} لطفا روز های دیگر را بررسی کنید.`}
      </p>
    );

  return (
    <div className={s.service}>
      <h1>
        تعداد
        <strong>{" " + toPersianNum(data.Items.length) + " "}</strong>
        سرویس از
        <strong>{" " + data.OriginPersianName + " " + " "}</strong>
        به
        <strong>{" " + data.DestinationPersianName + " "}</strong>
        در تاریخ
        <strong> {" " + toPersianNum(dateReverse(data.Date)) + " "} </strong>
        از ساعت
        <strong>{" " + toPersianNum(minDepartureTime) + " "}</strong>
        تا ساعت
        <strong>{" " + toPersianNum(maxDepartureTime) + " "}</strong>
        یافت شد
      </h1>
      {data?.Items.map((item: any, index: any) => (
        <div className={s.panel} key={index}>
          <div className={s.companyLogo}>
            <img src={item.CompanyLogo} alt="CompanyLogo" />
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
                <span className={s.availableSeatCount}>
                  تعداد صندلی های خالی: {toPersianNum(item.AvailableSeatCount)}
                </span>
              </div>
            </div>
            {item.Description && <div className={s.divider}></div>}
            {item.Description && <div className={s.description}>{item.Description}</div>}
            {!item.Description && <div style={{ height: "30px" }}></div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesDisplay;
