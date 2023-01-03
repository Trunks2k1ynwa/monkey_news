import React from "react";
import { useSearchParams } from "react-router-dom";
import DashBoardHeading from "../dashboard/DashBoardHeading.js";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import { categoryStatus } from "utils/constants";
import { db } from "firebase-app/firebase-config.js";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import slugify from "slugify/slugify.js";
import { toast } from "node_modules/react-toastify/dist/index.js";
import { useNavigate } from "node_modules/react-router-dom/index.js";

const CategoryUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "Categories", categoryId);
      const singelDoc = await getDoc(colRef);
      reset(singelDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  if (!categoryId) return null;
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db,"Categories",categoryId);
    await updateDoc(colRef, {
      title: values.title,
      slug: slugify(values.slug ||values.title,{lower:true}),
      status: values.status,
    })
    toast.success("Update category successfully");

  };
  return (
    <div>
      <DashBoardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashBoardHeading>
      <form
        onSubmit={handleSubmit(handleUpdateCategory)}
        autoComplete="off
      "
      >
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
