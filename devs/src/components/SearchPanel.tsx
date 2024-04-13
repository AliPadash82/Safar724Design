import React, { useState } from "react";
import "../assets/css/searchPanel.css";
import CustomInput from "./CustomInput";
import CustomAutocomplete from "./CustomAutocomplete";
import CalenderInput from "./CalendarInput";
import FilterSearch from "./FilterSearch";
import data from "../util/serviceResponse.json";
import cities from "../util/cities.json";

const SearchPanel = () => {
  const [display, setDisplay] = useState(false);

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

  return (
    <div className="search-panel">
      <div className="container">
        <div className="row">
          <div className="text special">لطفا مقصد را وارد نمایید</div>
          <div className="text">تاریخ حرکت</div>
          <div className="text">مقصد</div>
          <div className="text">مبداء</div>
        </div>
        <div className="row">
          <button className="search">جستجو</button>
          <div className="custom-gap" />
          <CalenderInput display={display} setDisplay={setDisplay}/>
          <div className="custom-gap" />
          <div className="in from">
            <i className="fas fa-map-marker-alt"></i>
            <CustomAutocomplete placeholder="مقصد را تایپ نمایید" cities={cities} handleFocus={handleFocus} />
          </div>

          <i className="fas fa-exchange-alt custom-gap"></i>
          <div className="in to">
            <i className="fas fa-map-marker-alt"></i>
            <CustomAutocomplete placeholder="مبداء را تایپ نمایید" cities={cities} handleFocus={handleFocus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
