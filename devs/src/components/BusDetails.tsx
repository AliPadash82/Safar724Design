import { useEffect, useState } from "react";
import s from "../assets/css/busDetails.module.css";
import { SeatType, SeatArrayType } from "../util/Models";
import { seatsArray_25_1, seatsArray_26_1, seatsArray_29_1, seatsArray_32_1 } from "../util/BusModels";
import Seat from "./Seat";
import transparentLogo from "../assets/images/logo-transparent.png";
import BusSchema from "./BusSchema";
import RefuncBox from "./RefundBox";

interface Props {
  serviceID: number;
  busCode: string;
  showDetails: boolean;
  setShowDetails: (showDetails: boolean) => void;
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
}

const BusDetails = ({ serviceID, busCode, showDetails, setShowDetails, trigger, setTrigger }: Props) => {
  const [column, setColumn] = useState(9);
  const [convertedSeatsArray, setConvertedSeatsArray] = useState<SeatType[]>(Array(5 * column).fill([null, null]));
  const [isFetched, setIsFetched] = useState(false);
  const [render, setRender] = useState(false);
  const [exceptMe, setExceptMe] = useState(false);
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
    setExceptMe(false);
    if (trigger && !exceptMe) {
      setShowDetails(false);
      setTrigger(false);
    }
  }, [trigger]);

  useEffect(() => {
    setTimeout(() => setRender(showDetails));
    if (!showDetails) {
      setTimeout(() => setIsFetched(false), 500);
      setExceptMe(false);
      return;
    }
    setExceptMe(true);
    setTimeout(() => setTrigger(true));
    fetchServices(serviceID)
      .then((data) => {
        let seatsArray: SeatType[] = [];
        switch (busCode) {
          case "VIP_25_1":
            setColumn(9);
            seatsArray = seatsArray_25_1;
            break;
          case "VIP_26_1":
            setColumn(10);
            seatsArray = seatsArray_26_1;
            break;
          case "VIP_29_1":
            setColumn(11);
            seatsArray = seatsArray_29_1;
            break;
          case "VIP_32_1":
            setColumn(12);
            seatsArray = seatsArray_32_1;
            break;
          default:
            break;
        }
        setConvertedSeatsArray(Array(5 * column).fill([null, null]));
        const newSeatsArray = [...seatsArray];
        for (let i = 0; i < seatsArray.length; i++) {
          const seat = seatsArray[i];
          if (seat && seat[0] != null) {
            const matchedData = data.filter((re) => re.SeatNumber === seat[0]);
            if (matchedData.length > 0) {
              newSeatsArray[i] = [matchedData[0].SeatNumber, matchedData[0].Gender];
              if (!matchedData[0].Accessible) {
                newSeatsArray[i] = [seat[0], "N"];
              }
            }
          }
        }
        setConvertedSeatsArray(newSeatsArray);
        setIsFetched(true);
      })
      .catch((error) => console.error("Failed to fetch or update seats:", error));
  }, [showDetails]);

  return isFetched ? (
    <div className={s.busDetails + (showDetails ? " " + s.show : "")}>
      <div className={s.dividerLine} />
      <RefuncBox />
      <div className={s.busInformation}>
        <BusSchema convertedSeatsArray={convertedSeatsArray} column={column} />
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
  ) : (
    showDetails && (
      <div className={s.busDetails + (render ? " " + s.show : "")}>
        <div className={s.quarterCircle} style={{ margin: "10px" }}></div>
        <div className={s.quarterCircle} style={{ padding: "5px", margin: "5px", animationDuration: "2s" }}></div>
        <div className={s.quarterCircle} style={{ padding: "10px", animationDuration: "2.5s" }}></div>
        <img src={transparentLogo} alt="transparentLogo" className={s.logo} />
      </div>
    )
  );
};

export default BusDetails;
