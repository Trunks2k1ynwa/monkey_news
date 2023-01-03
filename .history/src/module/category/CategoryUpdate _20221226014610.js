import React from "react";
import { useSearchParams } from "react-router-dom";
import DashBoardHeading from "../dashboard/DashBoardHeading.js";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  console.log(categoryId)
  // if(!categoryId) return null;
  return <div>
    <DashBoardHeading title="Update category" desc={`Update your category id: ${categoryId}`}></DashBoardHeading>
  </div>;
};

export default CategoryUpdate;