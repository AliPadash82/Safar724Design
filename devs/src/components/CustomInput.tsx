import { useEffect, useState } from "react";
import CustomAutocomplete from "./CustomAutocomplete";
import { City } from "../util/Models";

interface Props {
  isFocused: boolean;
  cities: City[];
  className: string;
  placeholder: string;
  setDisplay?: (display: boolean) => void;
  handleFocus?: () => void;
  offset?: string;
}

const CustomInput = ({ isFocused, cities, className, placeholder, setDisplay, handleFocus=()=>{}, offset="21%" }: Props) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    let timeout;
    if (!isFocused) {
      timeout = setTimeout(() => {
        setRender(false);
      });
    } else {
      setRender(true);
    }
  });
  return (
    <div className={className} style={{ zIndex: render ? 1000 : 1002 }}>
      <div className={"element-cover" + (isFocused ? " show" : "")} />
      <div className="triangle-right"></div>
      <CustomAutocomplete cities={cities} placeholder={placeholder} setDisplay={setDisplay} handleFocus={handleFocus} offset={offset} />
      <i className="icon-location"></i>
    </div>
  );
};

export default CustomInput;
