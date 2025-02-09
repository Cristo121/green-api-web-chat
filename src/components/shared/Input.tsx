import React, { useEffect, useState } from "react";
import EyeIcon from "../icons/eye";
import EyeSlashIcon from "../icons/eye-slash";

export type InputValueType = string | readonly string[] | number;

export interface InputProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  initialValue: InputValueType;
  className: string;
  value: InputValueType;
  onChange: (value: React.BaseSyntheticEvent) => void;
}

function Input({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  className = [
    "bg-transparent truncate opacity-25 outline-2 outline-offset-1 outline-emerald-500 rounded-lg",
    "border-1 h-[46px] text-emerald-950 placeholder-emerald-500 focus:outline-emerald-300",
  ].join(" "),
}: Partial<InputProps>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [autoComplete, setAutoComplete] =
    useState<React.HTMLInputAutoCompleteAttribute>("off");

  useEffect(() => {
    setAutoComplete((type === "password" && "current-password") || "off");
  }, [type]);

  return (
    <div className="flex flex-col align-left gap-2 relative w-full">
      {label && (
        <label className="antialiased font-semibold text-emerald-900">
          {label}
        </label>
      )}
      <input
        style={{
          padding: (type === "password" && "0 48px 0 16px") || "0 16px",
        }}
        className={className}
        type={(showPassword && "text") || type}
        {...{
          placeholder,
          value,
          onChange,
          autoComplete,
        }}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-3 text-emerald-900 top-1/2 transform: translate-1 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      )}
    </div>
  );
}

export default Input;
