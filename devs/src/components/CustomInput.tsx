import { useEffect, useState } from "react";
import CustomAutocomplete from "./CustomAutocomplete";
import { City } from "../util/Models";

interface Props {
  isFocused: boolean;
  cities: City[];
  className: string;
  placeholder: string;
  display?: boolean;
  handleFocus?: () => void;
  offset?: string;
  name?: string;
}

const CustomInput = ({ isFocused, cities, className, placeholder, display, handleFocus=()=>{}, offset="21%", name }: Props) => {
  const [render, setRender] = useState(false);
  const [render2, setRender2] = useState(false);

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
      setTimeout(() => {
        setRender(false);
      }, render2 ? 250 : 0);
    } else {
      setRender(true);
    }
  }, [isFocused]);
  
  return (
    <div className={className} style={{ zIndex: render2 || render ? 1000 : 1002 }}>
      <div className={"element-cover" + (isFocused ? " show" : "")} />
      <div className="triangle-right"></div>
      <CustomAutocomplete cities={cities} placeholder={placeholder} handleFocus={handleFocus} offset={offset} name={name}/>
      <i className="icon-location"></i>
    </div>
  );
};

export default CustomInput;
