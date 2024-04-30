import { useEffect, useState } from "react";
import CustomAutocomplete from "./CustomAutocomplete";
import s from "../assets/css/homeHeader.module.css";
import { City } from "../util/Models";
import { useAtom } from "jotai";
import { GlobalDisplayBoolean } from "../util/GlobalState";

interface Props {
  isFocused: boolean;
  cities: City[];
  className: string;
  placeholder: string;
  handleFocus?: () => void;
  offset?: string;
  name?: string;
  alertMassage?: string;
  alertBoolean?: boolean;
  delay?: string;
}

const CustomInput = ({
  isFocused,
  cities,
  className,
  placeholder,
  handleFocus = () => {},
  offset = "21%",
  name,
  alertMassage = "",
  alertBoolean = false,
  delay = "",
}: Props) => {
  const [render, setRender] = useState(false);
  const [render2, setRender2] = useState(false);
  const [display] = useAtom(GlobalDisplayBoolean);
  useEffect(() => {
    if (!display) {
      setTimeout(() => {
        setRender2(false);
      }, 250);
    } else {
      setRender2(true);
    }
  }, [display]);

  useEffect(() => {
    if (!isFocused) {
      setTimeout(
        () => {
          setRender(false);
        },
        render2 ? 250 : 0
      );
    } else {
      setRender(true);
    }
  }, [isFocused]);

  return (
    <div className={className} style={{ zIndex: render2 || render ? 1000 : 1002 }}>
      <div className={"element-cover" + (isFocused ? " show" : "")} />
      <div className="triangle-right"></div>
      <CustomAutocomplete
        cities={cities}
        placeholder={placeholder}
        handleFocus={handleFocus}
        offset={offset}
        name={name}
      />
      <div className={s["alert-container"]}>
        <p className={alertBoolean ? s.show : ""} style={{ transitionDelay: alertBoolean ? delay : "0s" }}>
          {alertMassage}
        </p>
      </div>
      <i className="icon-location"></i>
    </div>
  );
};

export default CustomInput;
