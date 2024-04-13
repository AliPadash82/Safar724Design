import React, { useState, useEffect } from "react";
import InputBox from "./InputBox"; // Assuming InputBox is in the same directory

interface Props {
  allElementTitle: string;
  elements: Map<string, string>; // This should be id to name mapping
  id: string; // Contextual ID for distinguishing different filters
  excheckedState?: {[key: string]: boolean;};
  exsetCheckedState?: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

const IdFilter = ({ elements, id, allElementTitle, excheckedState, exsetCheckedState }: Props) => {
  const [internalCheckedState, internalSetCheckedState] = useState<{ [key: string]: boolean }>({ all: true });
  const checkedState = excheckedState !== undefined ? excheckedState : internalCheckedState;
  const setCheckedState = exsetCheckedState !== undefined ? exsetCheckedState : internalSetCheckedState;


  useEffect(() => {
    const initialStates: { [key: string]: boolean } = { all: true };
    elements.forEach((name, elementId) => {
      // Corrected order for Map iteration
      initialStates[elementId] = false;
    });
    setCheckedState(initialStates);
  }, [elements, id]);

  const handleCheckboxChange = (elementId: string) => {
    if (elementId === `all`) {
      const newState: { [key: string]: boolean } = { all: true };
      elements.forEach((name, id) => {
        newState[id] = false;
      });
      setCheckedState(newState);
    } else {
      const newState = {
        ...checkedState,
        [elementId]: !checkedState[elementId],
        [`all`]: false,
      };

      const areAllUnchecked = Array.from(elements.keys()).every((key) => newState[key] === false);
      if (areAllUnchecked) {
        newState[`all`] = true;
      }
      setCheckedState(newState);
    }
  };

  return (
    <>
      <InputBox
        type="checkbox"
        name={`${id}_all`}
        id={`${id}_all`}
        checked={checkedState[`all`]}
        disabled={checkedState[`all`]}
        onChange={() => handleCheckboxChange(`all`)}>
        {allElementTitle}
      </InputBox>
      {Array.from(elements.entries()).map(([elementId, name], index) => (
        <InputBox
          key={index}
          type="checkbox"
          name={`${id}_${elementId}`}
          id={`${id}_${elementId}`}
          checked={checkedState[elementId]}
          onChange={() => handleCheckboxChange(elementId)}>
          {name}
        </InputBox>
      ))}
    </>
  );
};

export default IdFilter;
