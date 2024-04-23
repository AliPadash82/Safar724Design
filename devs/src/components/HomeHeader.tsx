import CustomInput from "./CustomInput";
import DateDiv from "./DateDiv";
import DateBox from "./DateBox";
import styles from "../assets/css/homeHeader.module.css";
import { useState } from "react";
import citiesJSON from "../util/cities.json";
import { useNavigate } from "react-router-dom";

interface Props {
  isFocused: boolean;
  isFocusedTo: boolean;
  display: boolean;
  setDisplay: (display: boolean) => void;
}

const HomeHeader = ({ isFocused, isFocusedTo, display, setDisplay }: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

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
  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prepare the payload to send
    const formData = {
      origin: e.currentTarget.origin.value,
      destination: e.currentTarget.destination.value,
      date: selectedDate,
    };

    // Navigate to "/bus" and pass the formData as state
    navigate("/services", { state: { formData } });
  };

  return (
    <form onSubmit={(e) => handleSubmission(e)} method="POST" name="myForm">
      <div className={styles["home-header"]}>
        <div className={styles.container}>
          <div className={`black-cover${isFocused || isFocusedTo || display ? " show" : ""}`}></div>
          <h2>خرید بلیط اتوبوس</h2>
          <h5>از تمامی ترمینال ها و شرکت های مسافربری کشور</h5>
          <CustomInput
            className={`${styles.in} from`}
            name="origin"
            isFocused={isFocusedTo || display}
            display={display}
            cities={citiesJSON}
            handleFocus={handleFocus}
            placeholder="مبداء را تایپ نمایید"
          />
          <CustomInput
            className={`${styles.in} to`}
            name="destination"
            isFocused={isFocused || display}
            cities={citiesJSON}
            display={display}
            handleFocus={handleFocus}
            placeholder="مقصد را تایپ نمایید"
          />
          <DateDiv className={"date-div"} setDisplay={setDisplay} selectedDate={selectedDate} />
          <DateBox
            selectedDate={selectedDate}
            display={display}
            setDisplay={setDisplay}
            setSelectedDate={setSelectedDate}
          />
          <button type="submit" className={styles.search}>
            <div className={`element-cover${isFocused || isFocusedTo ? ` ${" show"}` : ""}`} />
            جستوجو
          </button>
        </div>
      </div>
    </form>
  );
};

export default HomeHeader;
