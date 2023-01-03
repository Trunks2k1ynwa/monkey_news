import Button from "components/button/Button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import { collection } from "firebase/firestore"
import ImageUpload from "components/image/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import { query, where } from "firebase/firestore";('')
// use fw slugify to convert input to slug
let slugify = require("slugify");
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  // reacthook form
  const { control, watch, setValue, getValues, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 1,
      category: "",
      title: "",
      slug: "",
      hot:false,
    },
  });
  // watchStatus to save your status by number (1,2,3) follow sort of tag html have name = 'status'
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  // handle when submit add new post
  const addPostHandle = async (values) => {
    // values is values user provite for form
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
  };
  const {
    image,
    setImage,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage} = useFirebaseImage(setValue, getValues);

    useEffect(() => {
    const colRef = collection(db,'categories')
    const q = query(colRef,where("status","==",1));
    console.log(q);
    }, [])
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
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

          <Field>
            <Label>Author</Label>
            <Input
              name="author"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
        <Field>
          <Label>Feature Hot</Label>
          <Toggle on={watchHot===true} onClick={()=>setValue("hot",!watchHot)}></Toggle>
        </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button kind="primary" type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
