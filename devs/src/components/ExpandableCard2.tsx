import React, { useState, useEffect, useRef } from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
  direction?: "column" | "row";
  offset?: string;
}

const ExpandableCard2 = ({ children, title, direction = "column", offset = undefined }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="expandable-card2" ref={cardRef}>
      <div className={`expandable-card2-header${expanded ? " expanded" : ""}`} onClick={toggleExpanded}>
        <p className="unselectable">{title}</p>
        <i className={`fas fa-chevron-down ${expanded ? "rotate" : ""}`} style={{ transition: "none" }}></i>
      </div>
      <div
        className="expandable-card2-content"
        style={{
          display: expanded ? "flex" : "none",
          flexDirection: direction,
          transform: offset,
        }}>
        {children}
      </div>
    </div>
  );
};

export default ExpandableCard2;
