import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "../assets/css/autocomplete.css";
import { City } from "../util/Models";

interface Props {
  cities: City[];
  placeholder: string;
  setDisplay?: (display: boolean) => void;
  handleFocus?: () => void;
  offset?: string;
}

const CustomAutocomplete = ({ cities, placeholder, setDisplay, handleFocus=()=>{}, offset="11%"}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedOption(null); // Reset selection on input change

    if (!value) {
      setSuggestions([]);
    } else {
      const filteredSuggestions = cities.filter((city) =>
        city.SearchExpressions.some((expression) => expression.toLowerCase().startsWith(value.toLowerCase()))
      ).sort((a, b) => b.Order - a.Order);
      setSuggestions(filteredSuggestions);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    let newSelectedOption;

    // Arrow Down
    if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent cursor movements
      newSelectedOption = selectedOption === null || selectedOption === suggestions.length - 1 ? 0 : selectedOption + 1;
    }
    // Arrow Up
    else if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent cursor movements
      newSelectedOption = selectedOption === 0 || selectedOption === null ? suggestions.length - 1 : selectedOption - 1;
    }
    // Enter
    else if (event.key === "Enter") {
      if (selectedOption == null) {
        if (suggestions.length > 0) {
          event.preventDefault();
          setInputValue(suggestions[0].PersianName);
          setSuggestions([]);
        } else return;
      } else {
        event.preventDefault();
        setInputValue(suggestions[selectedOption].PersianName);
        setSuggestions([]);
        setSelectedOption(null);
      }

      handleFocus();

      return; // Prevent further processing
    }

    // Update the selected option and the input value as you navigate with arrow keys
    if (newSelectedOption !== undefined) {
      setSelectedOption(newSelectedOption);
      setInputValue(suggestions[newSelectedOption].PersianName);
    }

    setTimeout(
      () =>
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
        placeholder={String(placeholder)}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          // Delay hiding suggestions to allow click event to register on suggestions
          setSuggestions([]);
          setSelectedOption(null);
        }}
        onFocus={handleChange}
      />
      {inputValue.length > 0 && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li style={{paddingRight: offset}}
              key={index}
              className={index === selectedOption ? "selected" : ""}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent the input from being blurred
                setInputValue(suggestion.PersianName); // Update the input value
                setSuggestions([]); // Clear the suggestions
                setTimeout(() => handleFocus());
              }}>
              {suggestion.PersianName}{" - "}<span style={{fontSize: "12px", color: "#777"}}>{suggestion.ProvincePersianName}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CustomAutocomplete;
