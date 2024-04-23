import React, { useEffect, useState } from "react";
import "../assets/css/searchPanel.css";
import CustomInput from "./CustomInput";
import CustomAutocomplete from "./CustomAutocomplete";
import CalenderInput from "./CalendarInput";
import FilterSearch from "./FilterSearch";
import data from "../util/serviceResponse.json";
import cities from "../util/cities.json";
import { useLocation } from "react-router-dom";

interface Props {
  setSelectedDate: (date: Date) => void;
  selectedDate: Date;
}

const SearchPanel = ({ setSelectedDate, selectedDate }: Props) => {
  const [display, setDisplay] = useState(false);
  const location = useLocation();
  const formData = location.state?.formData;

  const handleFocus = () => {
    let temp = document.querySelectorAll("input");
    if (document.activeElement === temp[1]) {
      temp[1]?.blur();
      temp[0]?.focus();
    } else if (document.activeElement === temp[0]) {
      temp[0]?.blur();
      setDisplay(true);
    }
  };

  const handleExchange = () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    if (inputs.length >= 2) {
      const temp = inputs[0].value;
      inputs[0].value = inputs[1].value;
      inputs[1].value = temp;
    } else console.error("Expected at least two input elements, but found", inputs.length);
  };

  useEffect(() => {
    if (formData) {
      setSelectedDate(new Date(formData.date));
    }
  }, []);

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
              initialInputValue={formData.origin}
            />
          </div>
          <i className="fas fa-exchange-alt custom-gap" onClick={handleExchange}></i>
          <div className="in from">
            <i className="fas fa-map-marker-alt"></i>
            <CustomAutocomplete
              placeholder="مقصد را تایپ نمایید"
              cities={cities}
              handleFocus={handleFocus}
              initialInputValue={formData.destination}
            />
          </div>
          <div className="custom-gap" />
          <CalenderInput
            display={display}
            setDisplay={setDisplay}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <div className="custom-gap" />
          <button className="search">جستجو</button>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
