import React, { useMemo } from "react";
import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useForm } from "react-hook-form";
import Button from "components/button/Button.js";
import Radio from "components/checkbox/Radio.js";
import { Dropdown } from "components/dropdown";
import Field from "components/field/Field.js";
import ImageUpload from "components/image/ImageUpload.js";
import Input from "components/input/Input.js";
import Label from "components/label/Label.js";
import Toggle from "components/toggle/Toggle.js";
import useFirebaseImage from "hooks/useFirebaseImage.js";
import { postStatus } from "utils/constants.js";
import DashBoardHeading from "../dashboard/DashBoardHeading.js";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ImageUploader from "quill-image-uploader";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config.js";
import { toast } from "react-toastify";
import { imgbbAPI } from "../../config/apiConfig.js";
import axios from "../../../node_modules/axios/index.js";
import slugify from "../../../node_modules/slugify/slugify.js";
Quill.register("modules/imageUploader", ImageUploader);




const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("")
  const [selectCategory, setSelectCategory] = useState("");
  const { control, watch, setValue, getValues, handleSubmit, reset,formState:{isSubmitting}} = useForm({
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
  const imageName = getValues("image_name");
  const imageUrl = getValues("image");
  const {
    image,
    setImage,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    const colRef = doc(db, "Posts", postId);
    await updateDoc(colRef, {
      image_name: "",
    });
  }
  const updatePostHandle = async (values) => {
    values.slug = slugify(values.slug || values.title, { lower: true });
    const docRef = doc(db, "Posts", postId);
    await updateDoc(docRef, {
      ...values,
      image,
      content,
    })
    toast.success("Update post successfully");
  };
  const handleSelectOption = async (option) => {
    const colRef = doc(db, "Categories", option.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(option);
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
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!postId) return null;
      const docRef = doc(db, "Posts", postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data) {
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
        setContent(docSnapshot.data()?.content || "");
      }
    }
    fetchData();
  }, [postId, reset]);
  const modules = useMemo(()=> ({
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
    ],
    imageUploader:{
      upload:async(file)=>{
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        const response = await axios({
          method: "post",
          url: imgbbAPI,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data.data.url;
      }
    }
  }),[])
  if (!postId) return null;
  return (
    <>
      <DashBoardHeading
        title="Update post"
        desc="Update post"
        className="dashboard-heading"
      ></DashBoardHeading>
      <form onSubmit={handleSubmit(updatePostHandle)}>
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
        <div className="mb-10">
        <Field>
          <Label>Content</Label>
          <div className="w-full bg-white entry-content">
            <ReactQuill modules={modules} theme="snow" value={content} onChange={setContent} />
          </div>
        </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
        >
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
