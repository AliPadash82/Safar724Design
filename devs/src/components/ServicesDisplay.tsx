import { useCallback, useEffect, useRef, useState } from "react";
import { ServiceResponse } from "../util/Models";
import s from "../assets/css/servicesDisplay.module.css";
import { turnTimeToInteger, turnToDate } from "../util/Function";
import Panel from "./Panel";
import DummyPanel from "./DummyPanel";
import ServicesDisplayTitle from "./ServicesDisplayTitle";
import { useAtom } from "jotai";
import { GlobalServiceData } from "../util/GlobalState";

interface Props {
  sortBasedOnPrice: boolean;
  checkedState: { [key: string]: boolean };
  originState: { [key: string]: boolean };
  destinationState: { [key: string]: boolean };
  errorFetching: boolean;
}

const ServicesDisplay = ({ sortBasedOnPrice, checkedState, originState, destinationState, errorFetching }: Props) => {
  const [dataBasedOnPrice, setDataBasedOnPrice] = useState<ServiceResponse | null>(null);
  const [dataBasedOnHour, setDataBasedOnHour] = useState<ServiceResponse | null>(null);
  const [minDepartureTime, setMinDepartureTime] = useState<string>("00:00");
  const [maxDepartureTime, setMaxDepartureTime] = useState<string>("00:00");
  const [servicesData] = useAtom(GlobalServiceData);
  const [data, setData] = useState<ServiceResponse | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [trigger, setTrigger] = useState(false);
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
      data?.Items?.forEach((item) => {
        if (turnTimeToInteger(item.DepartureTime) < turnTimeToInteger(minTime)) minTime = item.DepartureTime;
        if (turnTimeToInteger(item.DepartureTime) > turnTimeToInteger(maxTime)) maxTime = item.DepartureTime;
      });
      setMinDepartureTime(minTime);
      setMaxDepartureTime(maxTime);
    } catch {}
  };

  useEffect(() => {
    if (!servicesData?.Items?.length) {
      return;
    }
    const clonedDataHour = JSON.parse(JSON.stringify(servicesData));
    clonedDataHour?.Items?.sort(
      (a: any, b: any) => turnTimeToInteger(a.DepartureTime) - turnTimeToInteger(b.DepartureTime)
    );
    setDataBasedOnHour(clonedDataHour);
  }, [servicesData]);

  useEffect(() => {
    setTrigger(!trigger);
    if (!servicesData?.Items?.length) {
      return;
    }
    if (!dataBasedOnPrice) {
      const clonedDataPrice = JSON.parse(JSON.stringify(servicesData));
      clonedDataPrice?.Items?.sort((a: any, b: any) => a.Price - b.Price);
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

  if (!servicesData)
    return errorFetching ? (
      <p className={s["no-service-alert"]}>متاسفانه خطایی رخ داده است.</p>
    ) : (
      <div className={s.service}>
        <div className={s.dummyText} />
        {Array.from({ length: 6 }, (_, index) => (
          <DummyPanel key={index} />
        ))}
      </div>
    );

  if (!servicesData?.Items?.length)
    return (
      <p className={s["no-service-alert"]}>
        {`متاسفانه بلیط اتوبوس ${servicesData.OriginPersianName} به ${
          servicesData.DestinationPersianName
        } در تاریخ ${turnToDate(servicesData.Date)}
         وجود ندارد.`}
        <br />
        {`برای خرید بلیط اتوبوس و مشاهده قیمت، ساعات حرکت و اتوبوس های مسیر ${servicesData.OriginPersianName} ${servicesData.DestinationPersianName} لطفا روز های دیگر را بررسی کنید.`}
      </p>
    );

  if (!data?.Items?.length) return <p className={s["no-service-alert"]}>متاسفانه خطایی رخ داده است.</p>;

  return (
    <div className={s.service}>
      <ServicesDisplayTitle minDepartureTime={minDepartureTime} maxDepartureTime={maxDepartureTime} />
      {data?.Items?.map((item: any, index: any) => (
        <Panel
          trigger={trigger}
          setTrigger={setTrigger}
          key={index}
          index={index}
          item={item}
          visibleCount={visibleCount}
          lastItemRef={lastItemRef}
        />
      ))}
    </div>
  );
};

export default ServicesDisplay;
