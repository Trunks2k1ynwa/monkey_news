import React from "react";
import { useSearchParams } from "react-router-dom";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  if(!categoryId) return null;
  return <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, reprehenderit corrupti. Odit ad reprehenderit culpa enim asperiores exercitationem ipsum vel suscipit ullam et, harum aliquid, rerum sed ab vitae accusantium.</div>;
};

export default CategoryUpdate;