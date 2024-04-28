import React from "react";
import transparentLogo from "../assets/images/logo-transparent.png";
import s from "../assets/css/busLoading.module.css";

const BusLoading = () => {
  return (
    <>
      <div className={s.quarterCircle} style={{ margin: "10px" }}></div>
      <div className={s.quarterCircle} style={{ padding: "5px", margin: "5px", animationDuration: "2s" }}></div>
      <div className={s.quarterCircle} style={{ padding: "10px", animationDuration: "2.5s" }}></div>
      <img src={transparentLogo} alt="transparentLogo" className={s.logo} />
    </>
  );
};

export default BusLoading;
