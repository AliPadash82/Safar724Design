import React from "react";

interface Props {
  className?: string;
  type: "radio" | "checkbox";
  name: string;
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const InputBox = ({
  className = "input-box",
  type = "checkbox",
  name,
  id,
  children,
  disabled = false,
  checked,
  onChange, 
  ref = null,
}: Props) => {
  return (
    <div className={className}>
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={onChange}  // Make sure to handle onChange to update the state
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default InputBox;

