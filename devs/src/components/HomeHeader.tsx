import CustomInput from "./CustomInput";
import DateDiv from "./DateDiv";
import DateBox from "./DateBox";
import styles from "../assets/css/homeHeader.module.css";
import { useEffect, useState } from "react";
import { City } from "../util/Models";
import citiesJSON from "../util/cities.json";

interface Props {
  isFocused: boolean;
  isFocusedTo: boolean;
  display: boolean;
  setDisplay: (display: boolean) => void;
}

const HomeHeader = ({ isFocused, isFocusedTo, display, setDisplay }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleFocus = () => {
    let temp = document.querySelectorAll("input");
    if (document.activeElement === temp[0]) {
      temp[0]?.blur();
      temp[1]?.focus();
    } else if (document.activeElement === temp[1] && setDisplay) {
      temp[1]?.blur();
      setDisplay(true);
    }
  };
  return (
    <div className={styles["home-header"]}>
      <div className={styles.container}>
        <div className={`black-cover${isFocused || isFocusedTo || display ? " show" : ""}`}></div>
        <h2>خرید بلیط اتوبوس</h2>
        <h5>از تمامی ترمینال ها و شرکت های مسافربری کشور</h5>
        <CustomInput
          className={`${styles.in} from`}
          isFocused={isFocusedTo || display}
          display={display}
          cities={citiesJSON}
          handleFocus={handleFocus}
          placeholder="مبداء را تایپ نمایید"
        />
        <CustomInput
          className={`${styles.in} to`}
          isFocused={isFocused || display}
          cities={citiesJSON}
          display={display}
          handleFocus={handleFocus}
          placeholder="مقصد را تایپ نمایید"
        />
        <DateDiv className={"date-div"} setDisplay={setDisplay} selectedDate={selectedDate} />
        <DateBox selectedDate={selectedDate} display={display} setDisplay={setDisplay} setSelectedDate={setSelectedDate} />
        <button className={styles.search}>
          <div className={`element-cover${isFocused || isFocusedTo ? ` ${" show"}` : ""}`} />
          جستوجو
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
