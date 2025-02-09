import { useEffect, useRef, useState } from "react";
import DotsIcon from "../icons/dots";

export interface Option {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: Option[];
  onSelect?: (option: Option) => void;
}

function Dropdown({ onSelect, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      setIsOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={[
          "flex justify-center items-center text-slate-500 w-[40px] h-[40px] rounded-full bg-transparent",
          "hover:bg-slate-500 hover:text-slate-700 hover:border-text-slate-700 hover: cursor-pointer",
        ].join(" ")}
      >
        <DotsIcon />
      </button>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute right-[8px] top-[72px] w-auto bg-slate-700 border-slate-500 rounded-lg shadow-lg overflow-hidden"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-slate-500 text-slate-500 hover:text-slate-700"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
