import React from "react";

interface Props {
  iconClass: string;
  title: string;
  children: React.ReactNode;
}

const Card = ({ iconClass, title, children }: Props) => {
  return (
    <div className="block">
      <i className={"icon " + iconClass}></i>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
};

export default Card;
