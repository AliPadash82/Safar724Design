import { useEffect, useState } from "react";
import "../assets/css/searchPanel.css";
import CustomAutocomplete from "./CustomAutocomplete";
import CalenderInput from "./CalendarInput";
import cities from "../util/cities.json";
import { useLocation, useNavigate } from "react-router-dom";
import { ServiceResponse } from "../util/Models";
import { formatDate } from "../util/Function";
import { fetchServices } from "../util/FetchFunction";
import { GlobalSelectedDate } from "../util/GlobalState";
import { useAtom } from "jotai";

interface Props {
  setServicesData: (data: ServiceResponse | null) => void;
  setErrorFetching: (errorFetching: boolean) => void;
}

const SearchPanel = ({ setServicesData, setErrorFetching }: Props) => {
  const [selectedDate] = useAtom(GlobalSelectedDate);
  const [display, setDisplay] = useState(false);
  const location = useLocation();
  var formData = location.state?.formData;
  const navigate = useNavigate();

  const handleSearchButtonClick = () => {
    console.log("handleSearchButtonClick called");
    const hiddenInputs = document.querySelectorAll<HTMLInputElement>('input[type="hidden"]');
    setServicesData(null);
    setErrorFetching(false);
    fetchServices(formatDate(selectedDate), Number(hiddenInputs[0].value), Number(hiddenInputs[1].value))
      .then((data) => {
        setServicesData(data);
      })
      .catch(() => {
        setErrorFetching(true);
      });
  };

  useEffect(() => {
    if (!formData) {
      setErrorFetching(true);
      return;
    }
    fetchServices(formatDate(selectedDate), formData.originID, formData.destinationID)
      .then((data) => {
        console.log("Fetched data:", data);
        setServicesData(data);
      })
      .catch(() => {
        setErrorFetching(true);
      });
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
  }, [selectedDate]);

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
    const hiddenInputs = document.querySelectorAll<HTMLInputElement>('input[type="hidden"]');
    if (inputs.length >= 2) {
      console.log(inputs[0].value, inputs[1].value);
      let temp = inputs[0].value;
      inputs[0].value = inputs[1].value;
      inputs[1].value = temp;
      console.log(inputs[0].value, inputs[1].value);
      temp = hiddenInputs[0].value;
      hiddenInputs[0].value = hiddenInputs[1].value;
      hiddenInputs[1].value = temp;
    } else console.error("Expected at least two input elements, but found", inputs.length);
  };

  return (
    <div className="search-panel" style={{ direction: "rtl" }}>
      <div className="container">
        <div className="row">
          <div className="text">مبداء</div>
          <div className="text">مقصد</div>
          <div className="text">تاریخ حرکت</div>
          <div className="text special">لطفا مقصد را وارد نمایید</div>
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
            />
          </div>
          <div className="custom-gap" />
          <CalenderInput display={display} setDisplay={setDisplay} />
          <div className="custom-gap" />
          <button className="search" onClick={handleSearchButtonClick}>
            جستجو
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
