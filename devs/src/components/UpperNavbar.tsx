import React from "react";
import "../assets/css/upperNavbar.css";
import logo from "../assets/images/logoWhite.282e17b9.svg";

interface Props {
  scrolled: boolean;
  style: React.CSSProperties;
  isFocused: boolean;
  setBringList: (bringList: boolean) => void;
}

const UpperNavbar = ({ scrolled, style, isFocused, setBringList }: Props) => {
  return (
    <div className={`upper-top-bar${scrolled ? " show" : ""}`} style={style} tabIndex={0}> 
      <div className={"element-cover" + (isFocused ? " show" : "")} />
      <div className="one">
        <a href="#" className="register">
          ثبت نام
        </a>
        <div className="separator-line"></div>
        <a href="#" className="enter">
          ورود
        </a>
        <a href="#" className="call-us">
          تماس با ما
        </a>
        <div className="separator-line"></div>
        <a href="#" className="about-us">
          درباره ما
        </a>
        <div className="separator-line"></div>
        <p>
          <span>۰۲۱</span>
          <span style={{ marginRight: "20px" }}>۵۳۸۲۶</span> پشتیبانی و فروش
        </p>
      </div>
      <div className="two">
        <img src={logo} alt="white-logo" />
        <div className="call-us">
          <h6>پشتیبانی و فروش</h6>
          <span>۰۲۱</span>
          <span>۵۳۸۲۶</span>
        </div>
        <div className="menu-div" onClick={() => setBringList(true)}>
          <span>منو</span>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </div>
  );
};

export default UpperNavbar;
