import React from 'react'
import RefundBox from './RefundBox'
import BusSchema from './BusSchema'
import Legend from './Legend'
import s from "../assets/css/busDetails.module.css";
import { SeatType } from '../util/Models';

interface Props {
  setShowDetails: (showDetails: boolean) => void
  convertedSeatsArray: SeatType[]
  column: number
}

const BusDetailsDisplay = ({ setShowDetails, convertedSeatsArray, column }: Props) => {
  return (
    <>
    <div className={s.cover}>
      <button className={s.transparentBuy}>خرید</button>
      <button className={s.backButton} onClick={() => setShowDetails(false)}>
        بازگشت
      </button>
    </div>
    <div className={s.dividerLine} />
    <div className={s.busInformation}>
      <BusSchema convertedSeatsArray={convertedSeatsArray} column={column} />
      <Legend className={s.legend} />
    </div>
    <RefundBox />
    <button className={s.greenBuy}>خرید</button>
  </>
  )
}

export default BusDetailsDisplay