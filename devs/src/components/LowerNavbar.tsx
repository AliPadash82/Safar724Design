import React from "react";
import logo from "../assets/images/logo.png";
import "../assets/css/lowerNavbar.css";
import MainChoces from "./MainChoces";

interface Props {
  scrolled: boolean;
  bringList: boolean;
  setBringList: (bringList: boolean) => void;
  menuListRef: React.RefObject<HTMLUListElement>;
  iconListRef: React.RefObject<HTMLElement>;
  isFocused: boolean;
}

const LowerNavbar = ({ scrolled, bringList, setBringList, menuListRef, iconListRef, isFocused }: Props) => {
  return (
    <div
      className="lower-top-bar"
      style={{
        height: scrolled ? "70px" : "95px",
        transform: scrolled ? "translateY(0px)" : "translateY(40px)",
      }}>
      <div className={"element-cover" + (isFocused ? " show" : "")} />
      <i className="fas fa-bars" ref={iconListRef} onClick={() => setBringList(!bringList)}></i>

      <ul
        className="menu"
        ref={menuListRef}
        style={{
          transform: bringList ? "translate(-50px, -18px)" : "translate(-250px, -18px)",
        }}>
        <MainChoces />
        <i onClick={() => setBringList(false)}>×</i>
      </ul>
      <a href="#" className="before-logo">
        آسان ترین راه رزرو و خرید بلیط اتوبوس
      </a>
      <a href="#" className="actual-logo">
        <img
          src={logo}
          alt="logo"
          style={{
            width: scrolled ? "90px" : "110px",
            transition: "all 0.2s ease-in-out",
          }}
        />
      </a>
    </div>
  );
};

export default LowerNavbar;
