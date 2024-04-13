import React from "react";
import "../assets/css/cardWithIconVerticall.css";

interface Props {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const CardWithIconVerticall = ({ title, icon, children }: Props) => {
  return (
    <div className="card-with-icon-verticall">
      <i className={`icon ${icon}`}></i>
      <div className="card-with-icon-verticall-content">
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default CardWithIconVerticall;
