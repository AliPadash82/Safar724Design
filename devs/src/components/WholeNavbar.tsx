import React, { useState, useEffect } from "react";
import UpperNavbar from "../components/UpperNavbar";
import LowerNavbar from "../components/LowerNavbar";
import Sidebar from "./Sidebar";

interface Props {
  isFocused: boolean;
}

const WholeNavbar = ({ isFocused }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [bringList, setBringList] = useState(false);
  const menuListRef = React.useRef<HTMLUListElement>(null);
  const iconListRef = React.useRef<HTMLElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 45;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuListRef.current &&
        !menuListRef.current.contains(event.target as Node) &&
        iconListRef.current &&
        !iconListRef.current.contains(event.target as Node) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setBringList(false); // If click was outside DateBox, close it
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <LowerNavbar
        scrolled={scrolled}
        bringList={bringList}
        setBringList={setBringList}
        menuListRef={menuListRef}
        iconListRef={iconListRef}
        isFocused={isFocused}
      />
      <UpperNavbar
        isFocused={isFocused}
        setBringList={setBringList}
        scrolled={scrolled && !isFocused}
        style={{
          transform: scrolled ? "translateY(-40px)" : "translateY(0px)",
          transition: "all 0.3s ease-in-out",
        }}
      />
      <Sidebar bringList={bringList} setBringList={setBringList} sidebarRef={sidebarRef} />
    </>
  );
};

export default WholeNavbar;
