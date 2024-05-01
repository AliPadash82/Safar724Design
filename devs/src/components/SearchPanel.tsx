import { useEffect, useState } from "react";
import "../assets/css/searchPanel.css";
import CustomAutocomplete from "./CustomAutocomplete";
import CalenderInput from "./CalendarInput";
import cities from "../util/cities.json";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../util/Function";
import { fetchServices } from "../util/FetchFunction";
import {
  GlobalAlertDoubleBoolean,
  GlobalDisplayBoolean,
  GlobalSelectedDate,
  GlobalServiceData,
} from "../util/GlobalState";
import { useAtom } from "jotai";

interface Props {
  setErrorFetching: (errorFetching: boolean) => void;
}

const SearchPanel = ({ setErrorFetching }: Props) => {
  const [servicesData, setServicesData] = useAtom(GlobalServiceData);
  const [selectedDate] = useAtom(GlobalSelectedDate);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [_, setDisplay] = useAtom(GlobalDisplayBoolean);
  const [alert, setAlert] = useAtom(GlobalAlertDoubleBoolean);
  const [forceInput, setForceInput] = useState<[string | undefined, string | undefined]>([undefined, undefined]);
  const location = useLocation();
  var formData = location.state?.formData;
  const navigate = useNavigate();

  useEffect(() => {
    const hiddenInputs = document.querySelectorAll<HTMLInputElement>('input[type="hidden"]');
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
    if (!inputs[1].value || !inputs[0].value) {
      setAlert([!Boolean(inputs[0].value), !Boolean(inputs[1].value)]);
      return;
    }
    setAlert([false,  false]);
    setServicesData(null);
    setErrorFetching(false);
    fetchServices(formatDate(selectedDate), Number(hiddenInputs[0].value), Number(hiddenInputs[1].value))
      .then((data) => {
        setServicesData(data);
      })
      .catch(() => {
        setErrorFetching(true);
      });
  }, [selectedDate, triggerFetch, forceInput]);

  useEffect(() => {
    if (!formData) {
      setErrorFetching(true);
      return;
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      let temp = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
      let temp2 = document.querySelectorAll<HTMLInputElement>('input[type="hidden"]');
      formData.origin = temp[0].value;
      formData.destination = temp[1].value;
      formData.originID = temp2[0].value;
      formData.destinationID = temp2[1].value;
      formData.date = selectedDate;
      navigate("/services", { state: { formData } });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [servicesData]);

  const handleFocus = () => {
    const temp = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
    if (document.activeElement === temp[0]) {
      temp[0]?.blur();
      temp[1]?.focus();
    } else if (document.activeElement === temp[1]) {
      temp[1]?.blur();
      setDisplay(true);
    }
  };

  const handleExchange = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
    setForceInput([inputs[1].value, inputs[0].value]);
  };

  const alertMessage = () => {
    if (Array.isArray(alert) && alert.length === 2) {
      const [isSourceMissing, isDestinationMissing] = alert;
      if (isSourceMissing && isDestinationMissing) return "لطفا مبداء و مقصد را وارد نمایید";
      else if (isSourceMissing) return "لطفا مبداء را وارد نمایید";
      else if (isDestinationMissing) return "لطفا مقصد را وارد نمایید";
    }
    return "";
  };

  return (
    <div className="search-panel" style={{ direction: "rtl" }}>
      <div className="container">
        <div className="row">
          <div className="text">مبداء</div>
          <div className="text">مقصد</div>
          <div className="text">تاریخ حرکت</div>
          <div className="text special">{alertMessage()}</div>
        </div>
        <div className="row">
          <div className="in to">
            <i className="fas fa-map-marker-alt"></i>
            <CustomAutocomplete
              placeholder="مبداء را تایپ نمایید"
              cities={cities}
              handleFocus={handleFocus}
              initialInputValue={formData?.origin ? formData.origin : ""}
              initialCityID={formData?.originID ? formData.originID : 0}
              ForceInputValue={forceInput[0]}
            />
          </div>
          <i className="fas fa-exchange-alt custom-gap" onClick={handleExchange}></i>
          <div className="in from">
            <i className="fas fa-map-marker-alt"></i>
            <CustomAutocomplete
              placeholder="مقصد را تایپ نمایید"
              cities={cities}
              handleFocus={handleFocus}
              initialInputValue={formData?.destination ? formData.destination : ""}
              initialCityID={formData?.destinationID ? formData.destinationID : 0}
              ForceInputValue={forceInput[1]}
            />
          </div>
          <div className="custom-gap" />
          <CalenderInput />
          <div className="custom-gap" />
          <button className="search" id="search-button" onClick={() => setTriggerFetch((prev) => !prev)}>
            جستجو
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
