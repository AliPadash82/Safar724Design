import { useEffect, useState } from "react";
import s from "../assets/css/busDetails.module.css";
import { SeatType } from "../util/Models";
import { seatsArray_25_1, seatsArray_26_1, seatsArray_29_1, seatsArray_32_1 } from "../util/BusModels";
import BusLoading from "./BusLoading";
import BusSchemaError from "./BusDisplayError";
import BusDetailsDisplay from "./BusDetailsDisplay";
import { fetchSeats } from "../util/FetchFunction";

interface Props {
  serviceID: number;
  busCode: string;
  showDetails: boolean;
  setShowDetails: (showDetails: boolean) => void;
  trigger: boolean;
}

const BusDetails = ({ serviceID, busCode, showDetails, setShowDetails, trigger }: Props) => {
  const [column, setColumn] = useState(9);
  const [convertedSeatsArray, setConvertedSeatsArray] = useState<SeatType[]>(Array(5 * column).fill([null, null]));
  const [isFetched, setIsFetched] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const [exceptMe, setExceptMe] = useState(false);

  useEffect(() => {
    setExceptMe(false);
    if (!exceptMe) {
      setShowDetails(false);
    }
  }, [trigger]);

  useEffect(() => {
    if (!showDetails) {
      setTimeout(() => setIsFetched(false), 400);
      setExceptMe(false);
      return;
    }
    setExceptMe(true);
    fetchSeats(serviceID)
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
      .catch((error) => {
        console.error(error);
        setIsFetched(false);
        setErrorFetching(true);
      });
  }, [showDetails]);

  const busDetailsClasses = `${s.busDetails} ${showDetails ? s.show : ""}`;

  return (
    <div className={busDetailsClasses}>
      {isFetched ? (
        <BusDetailsDisplay convertedSeatsArray={convertedSeatsArray} column={column} setShowDetails={setShowDetails} />
      ) : !errorFetching ? (
        <BusLoading />
      ) : (
        <BusSchemaError setShowDetails={setShowDetails} setErrorFetching={setErrorFetching} />
      )}
    </div>
  );
};

export default BusDetails;
