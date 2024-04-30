import CustomInput from "./CustomInput";
import DateDiv from "./DateDiv";
import DateBox from "./DateBox";
import styles from "../assets/css/homeHeader.module.css";
import citiesJSON from "../util/cities.json";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { GlobalAlertDoubleBoolean, GlobalDisplayBoolean, GlobalIsFocused, GlobalIsFocusedTo } from "../util/GlobalState";

const HomeHeader = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useAtom(GlobalDisplayBoolean);
  const [isFocused, setIsFocused] = useAtom(GlobalIsFocused);
  const [isFocusedTo, setIsFocusedTo] = useAtom(GlobalIsFocusedTo);
  const [alert, setAlert] = useAtom(GlobalAlertDoubleBoolean);

  const handleFocus = () => {
    const temp = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
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
    if (!e.currentTarget.origin.value || !e.currentTarget.destination.value) {
      setAlert([!e.currentTarget.origin.value, !e.currentTarget.destination.value]);
      return;
    }
    setDisplay(false);
    setIsFocused(false);
    setIsFocusedTo(false);
    setAlert([false, false]);
    const formData = {
      origin: e.currentTarget.origin.value,
      destination: e.currentTarget.destination.value,
      originID: e.currentTarget.originID.value,
      destinationID: e.currentTarget.destinationID.value,
    };

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
            cities={citiesJSON}
            handleFocus={handleFocus}
            placeholder="مبداء را تایپ نمایید"
            alertMassage="لطفا مبداء را انتخاب نمایید"
            alertBoolean={alert[0]}
          />
          <CustomInput
            className={`${styles.in} to`}
            name="destination"
            isFocused={isFocused || display}
            cities={citiesJSON}
            handleFocus={handleFocus}
            placeholder="مقصد را تایپ نمایید"
            alertMassage="لطفا مقصد را انتخاب نمایید"
            alertBoolean={alert[1]}
            delay="0.1s"
          />
          <DateDiv className={"date-div"} />
          <DateBox />
          <button type="submit" id="search-button" className={styles.search}>
            <div className={`element-cover${isFocused || isFocusedTo ? ` ${" show"}` : ""}`} />
            جستوجو
          </button>
        </div>
      </div>
    </form>
  );
};

export default HomeHeader;
