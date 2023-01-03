import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  console.log(children)
  return (
    <>
      {show && (
        <div className="mt-1 border-2 border-primary absolute top-full left-0 w-full bg-#000000">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
