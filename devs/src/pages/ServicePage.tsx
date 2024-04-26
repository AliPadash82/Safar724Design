import "../assets/css/index.css";
import WholeNavbar from "../components/WholeNavbar";
import BottomNavbar from "../components/BottomNavbar";
import SearchPanel from "../components/SearchPanel";
import DaysTab from "../components/DaysTab";
import ServicesDisplay from "../components/ServicesDisplay";
import FilterSearch from "../components/FilterSearch";
import data from "../util/serviceResponse.json";
import { useEffect, useState } from "react";
import TicketModel from "../components/TicketModel";
import { ServiceResponse } from "../util/Models";

function ServicePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sortBasedOnPrice, setSortBasedOnPrice] = useState(false);
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({ all: true });
  const [originState, setOriginState] = useState<{ [key: string]: boolean }>({ all: true });
  const [destinationState, setDistinationState] = useState<{ [key: string]: boolean }>({ all: true });
  const [servicesData, setServicesData] = useState<ServiceResponse | null>(null);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    const sortBasedOnHourCheckbox = document.querySelector<HTMLInputElement>("#s1");
    const sortBasedOnPriceCheckbox = document.querySelector<HTMLInputElement>("#s2");
    sortBasedOnHourCheckbox?.click();
    const checkInput = () => {
      setSortBasedOnPrice(sortBasedOnPriceCheckbox?.checked ? true : false);
    };
    checkInput();
    sortBasedOnPriceCheckbox?.addEventListener("change", checkInput); // Add change listener
    sortBasedOnHourCheckbox?.addEventListener("change", checkInput);
    return () => {
      sortBasedOnPriceCheckbox?.removeEventListener("change", checkInput); // Cleanup listener on unmount
      sortBasedOnHourCheckbox?.removeEventListener("change", checkInput);
    };
  }, []);

  

  return (
    <>
      <div className="space" style={{ height: "135px", backgroundColor: "#f0f0f0", zIndex: -1000 }}></div>
      <WholeNavbar isFocused={false} />
      <SearchPanel
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        setServicesData={setServicesData}
        setErrorFetching={setErrorFetching}
      />
      <div style={{ backgroundColor: "#FBFBFB", paddingTop: "10px" }}>
        <h1 style={{ marginTop: 0 }}>
          بلیط اتوبوس {data.OriginPersianName} {data.DestinationPersianName}
        </h1>
        <FilterSearch
          checkedState={checkedState}
          servicesData={servicesData}
          setCheckedState={setCheckedState}
          originState={originState}
          setOriginState={setOriginState}
          destinationState={destinationState}
          setDistinationState={setDistinationState}
        />
      </div>
      <DaysTab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ServicesDisplay
        servicesData={servicesData}
        sortBasedOnPrice={sortBasedOnPrice}
        checkedState={checkedState}
        originState={originState}
        destinationState={destinationState}
        errorFetching={errorFetching}
      />
      <TicketModel />
      <BottomNavbar />
    </>
  );
}

export default ServicePage;
