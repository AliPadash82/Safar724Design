import React from 'react'
import "../assets/css/sidebar.css"
import log from "../assets/images/logoWhite.282e17b9.svg"
import MainChoces from './MainChoces';

interface Props {
  bringList: boolean;
  setBringList: (bringList: boolean) => void;
  sidebarRef: React.RefObject<HTMLDivElement>;
}

const Sidebar = ({ bringList, setBringList, sidebarRef} : Props) => {
  return (
    <>
    <div className={`sidebar-blackcover${(bringList) ? " show" : ""}`}></div>
    <div className={`sidebar${(bringList) ? " show" : ""}`} ref={sidebarRef}>
      <div className='sidebar-blueheader'>
        <i onClick={() => setBringList(false)}>×</i>
        <img src={log} />
        <p><br/>آسان ترین راه رزرو و خرید بلیط اتوبوس</p>
        <span>پشتیبانی و فروش</span>
        <div className='phone-number'><span>۰۲۱</span><span>۵۳۸۲۶</span></div>
      </div>
      <ul className='list'>
        <li><a>ثبت نام</a></li>
        <li style={{marginTop: "25px"}}><a>ورود</a></li>
        <li><a>تماس با ما</a></li>
        <li style={{marginTop: "25px"}}><a>درباره ما</a></li>
        <MainChoces/>
      </ul>
    </div>
    </>
  )
}

export default Sidebar