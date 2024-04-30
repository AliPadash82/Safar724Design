import "../assets/css/index.css";
import WholeNavbar from "../components/WholeNavbar";
import BottomNavbar from "../components/BottomNavbar";
import SearchPanel from "../components/SearchPanel";
import DaysTab from "../components/DaysTab";
import ServicesDisplay from "../components/ServicesDisplay";
import FilterSearch from "../components/FilterSearch";
import { useEffect, useState } from "react";
import TicketModel from "../components/TicketModel";
import { GlobalServiceData } from "../util/GlobalState";
import { useAtom } from "jotai";

//
function ServicePage() {
  const [sortBasedOnPrice, setSortBasedOnPrice] = useState(false);
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({ all: true });
  const [originState, setOriginState] = useState<{ [key: string]: boolean }>({ all: true });
  const [destinationState, setDistinationState] = useState<{ [key: string]: boolean }>({ all: true });
  const [servicesData] = useAtom(GlobalServiceData);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    const sortBasedOnHourCheckbox = document.querySelector<HTMLInputElement>("#s1");
    const sortBasedOnPriceCheckbox = document.querySelector<HTMLInputElement>("#s2");
    sortBasedOnHourCheckbox?.click();
    const checkInput = () => {
      setSortBasedOnPrice(sortBasedOnPriceCheckbox?.checked ? true : false);
    };
    checkInput();
    sortBasedOnPriceCheckbox?.addEventListener("change", checkInput);
    sortBasedOnHourCheckbox?.addEventListener("change", checkInput);
    const inputs = document.querySelectorAll<HTMLInputElement>("input[type='text']");
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (!inputs[0]?.value) inputs[0]?.focus();
        else if (inputs[0]?.value && !inputs[1]?.value) inputs[1]?.focus();
        else if (inputs[0]?.value && inputs[1]?.value) null;
        if (inputs[0]?.value && inputs[1]?.value) document.getElementById("search-button")?.click();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
      sortBasedOnPriceCheckbox?.removeEventListener("change", checkInput);
      sortBasedOnHourCheckbox?.removeEventListener("change", checkInput);
    };
  }, []);

  return (
    <>
      <div className="space" style={{ height: "135px", backgroundColor: "#f0f0f0", zIndex: -1000 }}></div>
      <WholeNavbar isFocused={false} />
      <SearchPanel setErrorFetching={setErrorFetching} />
      <div style={{ backgroundColor: "#FBFBFB", paddingTop: "10px" }}>
        <h1 style={{ marginTop: 0 }}>
          بلیط اتوبوس {servicesData?.OriginPersianName} {servicesData?.DestinationPersianName}
        </h1>
        <FilterSearch
          checkedState={checkedState}
          setCheckedState={setCheckedState}
          originState={originState}
          setOriginState={setOriginState}
          destinationState={destinationState}
          setDistinationState={setDistinationState}
        />
      </div>
      <DaysTab />
      <ServicesDisplay
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
