import React from "react";
import "../assets/css/index.css";
import HomeHeader from "../components/HomeHeader";
import BlueHeader from "../components/BlueHeader";
import WholeNavbar from "../components/WholeNavbar";
import TwoColumns from "../components/TwoColumns";
import PositivePoints from "../components/PositivePoints";
import BottomNavbar from "../components/BottomNavbar";
import { useEffect, useState } from "react";

function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedTo, setIsFocusedTo] = useState(false);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>('input["text"]');
    const boxFrom = document.querySelector(".from");
    const boxTo = document.querySelector(".to");

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleFocusTo = () => setIsFocusedTo(true);
    const handleBlurTo = () => setIsFocusedTo(false);
    const handleMakeBlur = () => setTimeout(() => inputs[0]?.focus());
    const handleMakeBlurTo = () => setTimeout(() => inputs[1]?.focus());

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        inputs.forEach((input) => input.blur()); // Blur all inputs
        setIsFocused(false);
        setIsFocusedTo(false);
        setDisplay(false);
      }
    };

    inputs[0]?.addEventListener("focus", handleFocus);
    inputs[0]?.addEventListener("blur", handleBlur);
    inputs[1]?.addEventListener("focus", handleFocusTo);
    inputs[1]?.addEventListener("blur", handleBlurTo);
    boxFrom?.addEventListener("mousedown", handleMakeBlur);
    boxTo?.addEventListener("mousedown", handleMakeBlurTo);
    window.addEventListener("keydown", handleEscape);

    return () => {
      inputs[0]?.removeEventListener("focus", handleFocus);
      inputs[0]?.removeEventListener("blur", handleBlur);
      inputs[1]?.removeEventListener("focus", handleFocusTo);
      inputs[1]?.removeEventListener("blur", handleBlurTo);
      boxFrom?.removeEventListener("mousedown", handleMakeBlur);
      boxTo?.removeEventListener("mousedown", handleMakeBlurTo);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>("input[type='text']");
    const handleEnter = (event: KeyboardEvent) => {
      console.log(event.key);
      if (event.key === "Enter") {
        if (!display && !isFocused && !isFocusedTo) {
          if (!inputs[0]?.value) inputs[0]?.focus();
          else if (inputs[0]?.value && !inputs[1]?.value) inputs[1]?.focus();
          else if (inputs[0]?.value && inputs[1]?.value) setDisplay(true);
        }
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
      <HomeHeader isFocused={isFocused} isFocusedTo={isFocusedTo} display={display} setDisplay={setDisplay} />
      <BlueHeader />
      <TwoColumns />
      <PositivePoints />
      <BottomNavbar />
    </>
  );
}

export default App;
