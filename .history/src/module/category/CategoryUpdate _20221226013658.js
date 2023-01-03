import React from "react";
import { useSearchParams } from "react-router-dom";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  console.log("CategoryUpdate ~ params", params);
  return <div></div>;
};

export default CategoryUpdate;