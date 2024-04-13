import React from "react";
import "../assets/css/cardWithIcon.css";

interface Props {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const CardWithIcon = ({ title, icon, children }: Props) => {
  return (
    <div className="card-with-icon">
      <div className="card-with-icon-content">
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
      <i className={`icon ${icon}`}></i>
    </div>
  );
};

export default CardWithIcon;
