import React from "react";
import { toPersianNum, turnToDate } from "../util/Function";
import { ServiceResponse } from "../util/Models";
import { GlobalServiceData } from "../util/GlobalState";
import { useAtom } from "jotai";

interface Props {
  minDepartureTime: string;
  maxDepartureTime: string;
}

const ServicesDisplayTitle = ({minDepartureTime = "00:00", maxDepartureTime = "23:59"} : Props) => {
  const [data] = useAtom(GlobalServiceData);
  return (
    <h1>
      تعداد
      <strong>{" " + toPersianNum(data?.Items?.length) + " "}</strong>
      سرویس از
      <strong>{" " + data?.OriginPersianName + " " + " "}</strong>
      به
      <strong>{" " + data?.DestinationPersianName + " "}</strong>
      در تاریخ
      <strong> {" " + turnToDate(data?.Date) + " "} </strong>
      از ساعت
      <strong>{" " + toPersianNum(minDepartureTime) + " "}</strong>
      تا ساعت
      <strong>{" " + toPersianNum(maxDepartureTime) + " "}</strong>
      یافت شد
    </h1>
  );
};

export default ServicesDisplayTitle;
