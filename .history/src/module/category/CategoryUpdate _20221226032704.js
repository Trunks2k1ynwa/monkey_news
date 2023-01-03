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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import slugify from "slugify/slugify.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CategoryUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {isSubmitting },
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
  // if(categoryId) {
  //   async function fetchData() {
  //     try {
  //       const colRef = doc(db,"Categories", categoryId);
  //       const singelDoc = await getDoc(colRef);
  //       reset(singelDoc.data());
  //     } catch (e) {
  //       console.log("Something went wrong: " + e.message);
  //     }
  //   }
  //   fetchData();
  // }
  useEffect(() => {
    async function fetchData() {
      try {
        if(categoryId){
          const colRef = doc(db,"Categories", categoryId);
          const singelDoc = await getDoc(colRef);
          reset(singelDoc.data());
        }
      } catch (e) {
        console.log("Something went wrong: " + e.message);
      }
    }
    fetchData();
  }, [categoryId,reset]);

  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    try {
      const colRef = doc(db, "Categories", categoryId);
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
      });
      toast.success("Update category successfully");
      navigate("/manage/category");
    } catch (e) {
      alert("Something went wrong:" + e.message);
    }
  };
  if (!categoryId) return null;
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
