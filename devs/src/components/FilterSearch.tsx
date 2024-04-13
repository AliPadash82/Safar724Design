import React, { useEffect, useState } from "react";
import ExpandableCard2 from "./ExpandableCard2";
import InputBox from "./InputBox";
import "../assets/css/filterSearch.css";
import IdFilter from "./IdFilter";
import data from "../util/serviceResponse.json";

interface Props {
  checkedState?: { [key: string]: boolean };
  setCheckedState?: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  originState?: { [key: string]: boolean };
  setOriginState?: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  destinationState?: { [key: string]: boolean };
  setDistinationState?: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

const FilterSearch = ({ checkedState, setCheckedState, originState, setOriginState, destinationState, setDistinationState }: Props) => {
  const [companyData, setCompanyData] = useState<Map<string, string>>(new Map());
  const [originData, setOriginData] = useState<Map<string, string>>(new Map());
  const [destinationData, setDestinationData] = useState<Map<string, string>>(new Map());

  const extractCompanies = () => {
    const newCompanyData = new Map<string, string>();
    const newOriginData = new Map<string, string>();
    const newDestinationData = new Map<string, string>();

    data.Items.forEach((item) => {
      newCompanyData.set(item.CompanyId.toString(), item.CompanyPersianName);
      newOriginData.set(item.OriginTerminalCode, item.OriginTerminalPersianName);
      newDestinationData.set(item.DestinationTerminalCode, item.DestinationTerminalPersianName);
    });

    // Update state with the new Maps
    setCompanyData(newCompanyData);
    setOriginData(newOriginData);
    setDestinationData(newDestinationData);
  };
  useEffect(() => {
    extractCompanies();
  }, []);

  return (
    <div className="filter-search">
      <ExpandableCard2 title="مرتب سازی بر اساس">
        <InputBox type="radio" name="sort" id="s1">
          ساعت
        </InputBox>
        <InputBox type="radio" name="sort" id="s2">
          قیمت
        </InputBox>
      </ExpandableCard2>
      <ExpandableCard2 title="فیلتر بر اساس شرکت">
        <IdFilter
          allElementTitle="همه شرکت ها"
          elements={companyData}
          id="company"
          excheckedState={checkedState}
          exsetCheckedState={setCheckedState}
        />
      </ExpandableCard2>
      <ExpandableCard2 title="فیلتر بر اساس پایانه" direction="row">
        <div className="end-start-point">
          <p>پایانه مبداء</p>
          <IdFilter allElementTitle="همه پایانه های مبداء" elements={originData} id="origin" excheckedState={originState} exsetCheckedState={setOriginState}/>
        </div>
        <div className="end-start-point">
          <p>پایانه مقصد</p>
          <IdFilter allElementTitle="همه پایانه های مقصد" elements={destinationData} id="destination" excheckedState={destinationState} exsetCheckedState={setDistinationState} />
        </div>
      </ExpandableCard2>
    </div>
  );
};

export default FilterSearch;
