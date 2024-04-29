import React from "react";
import "../assets/css/index.css";
import HomeHeader from "../components/HomeHeader";
import BlueHeader from "../components/BlueHeader";
import WholeNavbar from "../components/WholeNavbar";
import TwoColumns from "../components/TwoColumns";
import PositivePoints from "../components/PositivePoints";
import BottomNavbar from "../components/BottomNavbar";
import { useEffect, useState } from "react";
import { BsPass } from "react-icons/bs";

function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedTo, setIsFocusedTo] = useState(false);
  const [display, setDisplay] = useState(true);
  const [alert, setAlert] = useState<[boolean, boolean]>([false, false]);

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
    const boxFrom = document.querySelector(".from");
    const boxTo = document.querySelector(".to");

    const handleFocus = () => {
      setIsFocused(true);
      setTimeout(() => setAlert([false, false]), 11);
    };
    const handleBlur = () => {
      setIsFocused(false);
      setTimeout(() => setAlert([inputs[0].value == "", inputs[1].value == ""]), 10);
    };
    const handleFocusTo = () => {
      setIsFocusedTo(true);
      setTimeout(() => setAlert([false, false]), 11);
    };
    const handleBlurTo = () => {
      setIsFocusedTo(false);
      setTimeout(() => setAlert([inputs[0].value == "", inputs[1].value == ""]), 10);
    };
    const handleMakeFocused = () => setTimeout(() => inputs[0]?.focus());
    const handleMakeFocusedTo = () => setTimeout(() => inputs[1]?.focus());

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        inputs.forEach((input) => input.blur());
        setIsFocused(false);
        setIsFocusedTo(false);
        setDisplay(false);
      }
    };

    inputs[0]?.addEventListener("focus", handleFocus);
    inputs[0]?.addEventListener("blur", handleBlur);
    inputs[1]?.addEventListener("focus", handleFocusTo);
    inputs[1]?.addEventListener("blur", handleBlurTo);
    boxFrom?.addEventListener("mousedown", handleMakeFocused);
    boxTo?.addEventListener("mousedown", handleMakeFocusedTo);
    window.addEventListener("keydown", handleEscape);

    return () => {
      inputs[0]?.removeEventListener("focus", handleFocus);
      inputs[0]?.removeEventListener("blur", handleBlur);
      inputs[1]?.removeEventListener("focus", handleFocusTo);
      inputs[1]?.removeEventListener("blur", handleBlurTo);
      boxFrom?.removeEventListener("mousedown", handleMakeFocused);
      boxTo?.removeEventListener("mousedown", handleMakeFocusedTo);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>("input[type='text']");
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (!display && !isFocused && !isFocusedTo) {
          if (!inputs[0]?.value) inputs[0]?.focus();
          else if (inputs[0]?.value && !inputs[1]?.value) inputs[1]?.focus();
          else if (inputs[0]?.value && inputs[1]?.value) setDisplay(true);
        }
        if (inputs[0]?.value && inputs[1]?.value && display) document.getElementById("search-button")?.click();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [display, isFocused, isFocusedTo]);

  return (
    <>
      <div
        className="space"
        style={{ height: "170px", backgroundColor: "#cbe6f8", zIndex: -1000, transform: "translateY(40px)" }}></div>
      <WholeNavbar isFocused={isFocused || isFocusedTo || display} />
      <HomeHeader
        isFocused={isFocused}
        isFocusedTo={isFocusedTo}
        display={display}
        setDisplay={setDisplay}
        alert={alert}
        setAlert={setAlert}
      />
      <BlueHeader />
      <TwoColumns />
      <PositivePoints />
      <BottomNavbar />
    </>
  );
}

export default App;
