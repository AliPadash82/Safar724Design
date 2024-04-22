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
    const inputs = document.querySelectorAll("input");
    const boxFrom = document.querySelector(".in.from");
    const boxTo = document.querySelector(".in.to");

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleFocusTo = () => setIsFocusedTo(true);
    const handleBlurTo = () => setIsFocusedTo(false);
    const handleMakeBlur = () => inputs[0]?.focus();
    const handleMakeBlurTo = () => inputs[1]?.focus();

    inputs[0]?.addEventListener("focus", handleFocus);
    inputs[0]?.addEventListener("blur", handleBlur);
    inputs[1]?.addEventListener("focus", handleFocusTo);
    inputs[1]?.addEventListener("blur", handleBlurTo);
    boxFrom?.addEventListener("click", handleMakeBlur);
    boxTo?.addEventListener("click", handleMakeBlurTo);

    return () => {
      inputs[0]?.removeEventListener("focus", handleFocus);
      inputs[0]?.removeEventListener("blur", handleBlur);
      inputs[1]?.removeEventListener("focus", handleFocusTo);
      inputs[1]?.removeEventListener("blur", handleBlurTo);
      boxFrom?.removeEventListener("click", handleMakeBlur);
      boxTo?.removeEventListener("click", handleMakeBlurTo);
    };
  }, []);

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
