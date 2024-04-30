import s from "../assets/css/dummyPanel.module.css";

const DummyPanel = () => {
  return (
    <div className={s.dummyPanel}>
      <div className={s.dummyCover} />
      <div className={s.dummyCompanyLogo}>
        <span></span>
      </div>
      <div className={s.dummyInfo}>
        <div className={s.dummyInner}>
          <div className={s.dummyOd} />
          <div className={s.dummyDepartureTime} />
          <div className={s.dummyPrice} />
          <div className={s.dummyBuy} />
        </div>
        <div className={s.dummyDivider} />
      </div>
    </div>
  );
};

export default DummyPanel;
