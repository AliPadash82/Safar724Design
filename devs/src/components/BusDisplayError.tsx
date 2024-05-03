import React from "react";
import RefundBox from "./RefundBox";
import BusSchema from "./BusSchema";
import Legend from "./Legend";
import { seatsArray_DUMMY } from "../util/BusModels";
import s from "../assets/css/busDetails.module.css";

interface Props {
  setShowDetails: (showDetails: boolean) => void;
  setErrorFetching: (errorFetching: boolean) => void;
}

const BusSchemaError = ({ setShowDetails, setErrorFetching }: Props) => {
  const retry = () => {
    setShowDetails(false);
    setTimeout(() => setShowDetails(true));
    setErrorFetching(false);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <div className={s.dividerLine} />
      <div className={s.cover + " " + s.errorCover}>
        <i className="fas fa-times"></i>
        <h1>خطایی رخ داده است. دوباره تلاش کنید</h1>
        <button className={s.retryButton} onClick={retry}>
          <span>تلاش مجدد</span>
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className={s.busInformation}>
        <BusSchema convertedSeatsArray={seatsArray_DUMMY} blur={true} column={12} />
        <Legend className={s.legend} />
      </div>
      <RefundBox />
    </div>
  );
};

export default BusSchemaError;
