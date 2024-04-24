import { useCallback, useEffect, useRef, useState } from "react";
import { ServiceResponse } from "../util/Models";
import s from "../assets/css/servicesDisplay.module.css";
// import servicesData from "../util/serviceResponse.json";
import { toPersianNum, putComma, dateReverse, turnTimeToInteger } from "../util/Function";
import Panel from "./Panel";

interface Props {
  sortBasedOnPrice: boolean;
  checkedState: { [key: string]: boolean };
  originState: { [key: string]: boolean };
  destinationState: { [key: string]: boolean };
  servicesData: ServiceResponse | null;
}

const ServicesDisplay = ({ sortBasedOnPrice, checkedState, originState, destinationState, servicesData }: Props) => {
  const [dataBasedOnPrice, setDataBasedOnPrice] = useState<ServiceResponse | null>(null);
  const [dataBasedOnHour, setDataBasedOnHour] = useState<ServiceResponse | null>(null);
  const [minDepartureTime, setMinDepartureTime] = useState<string>("00:00");
  const [maxDepartureTime, setMaxDepartureTime] = useState<string>("00:00");
  const [data, setData] = useState<ServiceResponse | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.Items && visibleCount < data.Items?.length) {
          setVisibleCount((prevVisibleCount) => prevVisibleCount + 3);
        }
      });
      if (node) observer.current.observe(node);
    },
    [visibleCount, data?.Items?.length]
  );

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
    if (!servicesData || servicesData.Items.length === 0) {
      setData(null);
      setDataBasedOnPrice(null);
      return;
    }
    const clonedDataHour = JSON.parse(JSON.stringify(servicesData));
    clonedDataHour.Items.sort(
      (a: any, b: any) => turnTimeToInteger(a.DepartureTime) - turnTimeToInteger(b.DepartureTime)
    );
    setDataBasedOnHour(clonedDataHour);
  }, [servicesData]);

  useEffect(() => {
    if (!servicesData || !servicesData.Items || servicesData.Items.length === 0) {
      setData(null);
      return;
    }
    if (!dataBasedOnPrice) {
      const clonedDataPrice = JSON.parse(JSON.stringify(servicesData));
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
  }, [checkedState, originState, destinationState, dataBasedOnPrice, dataBasedOnHour, sortBasedOnPrice, servicesData]);

  if (!data)
    return (
      <div className={s.service}>
        {Array.from({ length: 4 }, (_, index) => (
          <div className={s.dummyPanel} key={index}>
            <div className={s.dummyCompanyLogo} />
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
        ))}
      </div>
    );
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
      {data?.Items.slice(0, visibleCount).map((item: any, index: any) => (
        <Panel
          data={data}
          key={index}
          item={item}
          index={index}
          visibleCount={visibleCount}
          lastItemRef={lastItemRef}></Panel>
      ))}
    </div>
  );
};

export default ServicesDisplay;
