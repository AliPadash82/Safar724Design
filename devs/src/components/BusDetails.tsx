import React, { useEffect, useState } from "react";
import s from "../assets/css/busDetails.module.css";
import busFront from "../assets/images/BusFront.png";
import { SeatType, SeatArrayType } from "../util/Models";
import { seatsArray } from "../util/BusModels";
import Seat from "./Seat";

interface Props {
  serviceID: number;
}

const BusDetails = ({ serviceID }: Props) => {
  const [convertedSeatsArray, setConvertedSeatsArray] = useState<SeatType[]>(Array(45).fill([null, null]));

  const fetchServices = async (serviceID: number): Promise<SeatArrayType[]> => {
    const url = new URL("http://localhost:8080/api/v1/getseats");
    url.searchParams.append("ServiceID", serviceID.toString());

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchServices(serviceID)
      .then((data) => {
        console.log("Fetched data:", data);
        const newSeatsArray = [...seatsArray];
        for (let i = 0; i < seatsArray.length; i++) {
          const seat = seatsArray[i];
          if (seat && seat[0] != null) {
            const matchedData = data.filter((re) => re.SeatNumber === seat[0]);
            if (matchedData.length > 0) {
              newSeatsArray[i] = [matchedData[0].SeatNumber, matchedData[0].Gender];
            } else {
              newSeatsArray[i] = [seat[0], 'N'];
            }
          }
        }
        setConvertedSeatsArray(newSeatsArray);
      })
      .catch((error) => console.error("Failed to fetch or update seats:", error));
  }, [serviceID]);

  return (
    <>
      <div className={s.busDetails}>
        <div className={s.dividerLine} />
        <div className={s.cancelationCondition}></div>
        <div className={s.busInformation}>
          <div className={s.busSchema}>
            <div className={s.busInner}>
              <div className={s.grid}>
                {convertedSeatsArray.map((seat, index) => (
                  <Seat seat={seat} key={index} />
                ))}
              </div>
            </div>
            <img src={busFront} alt="bus front" />
          </div>
          <div className={s.legend}>
            <div>
              <Seat size="20px" seat={[null, "M"]} /> خریداری شده برای آقایان
            </div>
            <div>
              <Seat size="20px" seat={[null, "F"]} /> خریداری شده برای بانوان
            </div>
            <div>
              <Seat size="20px" seat={[null, "N"]} /> غیر قابل خرید
            </div>
            <div>
              <Seat size="20px" seat={[null, null]} /> قابل خرید
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusDetails;
