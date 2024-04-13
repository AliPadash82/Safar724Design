import React, { useState } from "react";
import "../assets/css/expandableCard.css";

interface Props {
  title: string;
  children: React.ReactNode;
}

const ExpandableCard = ({ title, children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="expandable-card">
      <div className={`expandable-card-header ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(!expanded)}>
        <p>{title}</p>
        <i className={`fas fa-chevron-down ${expanded ? "rotate" : ""}`}></i>
      </div>
      <p className={`expandable-card-content ${expanded ? "expanded" : ""}`}>{children}</p>
    </div>
  );
};

export default ExpandableCard;
