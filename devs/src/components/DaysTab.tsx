import React from "react";
import "../assets/css/daysTab.css";
import { weekdays } from "../util/Constant";
import { toPersianNum } from "../util/Function";

const DaysTab = () => {
  return (
    <div className="days-tab">
      <div className="days-tab-container">
        <i className="fas fa-chevron-right"></i>
        {weekdays.map((day, index) => (
          <div key={index} className="specific-day">
            <span className="weekday">{day}</span> <span className="date-after-weekday">{toPersianNum(index + 1)}</span>
          </div>
        ))}
        <i className="fas fa-chevron-left"></i>
      </div>
    </div>
  );
};

export default DaysTab;
