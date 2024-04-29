import { useState, ChangeEvent, KeyboardEvent } from "react";
import "../assets/css/autocomplete.css";
import { City } from "../util/Models";

interface Props {
  cities: City[];
  placeholder: string;
  handleFocus?: () => void;
  offset?: string;
  name?: string;
  initialInputValue?: string;
  initialCityID?: number;
}

const CustomAutocomplete = ({
  cities,
  placeholder,
  handleFocus = () => {},
  offset = "11%",
  name = undefined,
  initialInputValue = "",
  initialCityID = undefined,
}: Props) => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [cityID, setCityID] = useState(initialCityID);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedOption(0);

    if (!value) {
      setSuggestions([]);
    } else {
      const filteredSuggestions = cities
        .filter((city) =>
          city.SearchExpressions.some((expression) => expression.toLowerCase().startsWith(value.toLowerCase()))
        )
        .sort((a, b) => b.Order - a.Order);
      setSuggestions(filteredSuggestions);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    let newSelectedOption;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      newSelectedOption = selectedOption === null || selectedOption === suggestions.length - 1 ? 0 : selectedOption + 1;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      newSelectedOption = selectedOption === 0 || selectedOption === null ? suggestions.length - 1 : selectedOption - 1;
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedOption == null)
        if (suggestions.length > 0) {
          setInputValue(suggestions[0].PersianName);
          setCityID(suggestions[0].ID);
        } else return;
      else {
        setInputValue(suggestions[selectedOption].PersianName);
        setCityID(suggestions[selectedOption].ID);
      }
      setTimeout(() => handleFocus());
      return;
    }

    if (newSelectedOption !== undefined) {
      setSelectedOption(newSelectedOption);
      setInputValue(suggestions[newSelectedOption].PersianName);
      setCityID(suggestions[newSelectedOption].ID);
    }

    setTimeout(() =>
      document.querySelector(".selected")?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "start",
      })
    );
  };

  return (
    <>
      <input
        type="text"
        name={name}
        placeholder={String(placeholder)}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        onBlur={() => {
          setTimeout(() => {
            const expressions = suggestions.flatMap((suggestion) => suggestion.SearchExpressions);
            if (inputValue && !expressions.includes(inputValue)) {
              setInputValue("");
              setCityID(undefined);
            } else if (inputValue === "") setCityID(undefined);
            else setCityID(cities.find((city) => city.PersianName === inputValue)?.ID);
            setSuggestions([]);
            setSelectedOption(null);
          });
        }}
        onFocus={handleChange}
      />
      <input type="hidden" name={`${name}ID`} value={cityID} />
      {inputValue.length > 0 && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              style={{ paddingRight: offset }}
              key={index}
              className={index === selectedOption ? "selected" : ""}
              onMouseDown={(e) => {
                e.preventDefault();
                setCityID(suggestion.ID);
                setInputValue(suggestion.PersianName);
                setTimeout(() => handleFocus());
              }}>
              {suggestion.PersianName}
              {" - "}
              <span style={{ fontSize: "12px", color: "#777" }}>{suggestion.ProvincePersianName}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CustomAutocomplete;
