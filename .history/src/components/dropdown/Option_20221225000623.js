import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="flex items-center justify-between px-5 py-4 text-sm font-bold transition-all shadow-md cursor-pointer hover:bg-[#a9f3cf]"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
