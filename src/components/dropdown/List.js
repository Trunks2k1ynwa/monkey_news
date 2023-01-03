import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute left-0 w-full mt-1 bg-white border-2 border-primary top-full">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
