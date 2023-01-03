import Button from "components/button/Button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Label } from "components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import ImageUpload from "components/image/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import {
  query,
  collection,
  getDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  where,
} from "firebase/firestore";
import Input from "components/input/Input.js";
import { useState } from "react";
import { useAuth } from "contexts/auth-context.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoardHeading from "../dashboard/DashBoardHeading.js";

// import Input from "components/input/Input";
// use fw slugify to convert input to slug
let slugify = require("slugify");
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();
  // reacthook form
  const { control, watch, setValue, getValues, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 1,
      title: "",
      slug: "",
      hot: false,
      image: "",
      category: {},
      user: {},
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    image,
    progress,
    handleResetUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "Accounts"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", { id: doc.id, ...doc.data() });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);
  // watchStatus to save your status by number (1,2,3) follow sort of tag html have name = 'status'
  // handle when submit add new post
  const addPostHandle = async (values) => {
    setLoading(true);
    try {
      // values is values user provite for form
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db,"Posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        categoryId: cloneValues.category.id,
        userId: cloneValues.user.id,
        // Xđ field được tạo vào thời điểm nào
        createdAt: serverTimestamp(),
      });
      toast.success("Creat new post Successfully");
      reset({
        status: 1,
        categoryId: "",
        title: "",
        slug: "",
        category: {},
        hot: false,
        image: "",
      });
      setSelectCategory({});
      handleResetUpload();
      setLoading(false);
    } catch (error) {
      setLoading(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  useEffect(() => {
    async function getData() {
      let results = [];
      const colRef = collection(db, "Categories");
      const q = query(colRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategories(results);
    }
    getData();
  }, []);
  const handleSelectOption = async (option) => {
    const colRef = doc(db, "Categories", option.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(option);
  };
  return (
    <PostAddNewStyles>
      <DashBoardHeading
        title="Add new post"
        desc="Add new post"
        className="dashboard-heading"
      ></DashBoardHeading>
      <form onSubmit={handleSubmit(addPostHandle)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>

          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              image={image}
              progress={progress}
              type="file"
              name="image"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.map((option) => (
                  <Dropdown.Option
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.name}
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 mt-1 text-sm font-medium bg-green-200 rounded-lg color-green">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          {/* <Field>
            <Label>Author</Label>
            <Input
              name="author"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field> */}
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>

        <Button
          isLoading={loading}
          disabled={loading}
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
