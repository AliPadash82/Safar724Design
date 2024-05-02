import { ReactNode } from "react";
import s from "../assets/css/alertBox.module.css";

interface Props {
  children?: ReactNode;
  title?: string;
}

const AlertBox = ({ children, title }: Props) => {
  return (
    <div className={s.blackCover}>
      <div className={s.alertBox}>
        <i className={s.cross}/>
        <h1>{title}</h1>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default AlertBox;
