import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "components/button/Button.js";
import Radio from "components/checkbox/Radio.js";
import Dropdown from "components/dropdown/Dropdown.js";
import Field from "components/field/Field.js";
import ImageUpload from "components/image/ImageUpload.js";
import Input from "components/input/Input.js";
import Label from "components/label/Label.js";
import Toggle from "components/toggle/Toggle.js";
import useFirebaseImage from "hooks/useFirebaseImage.js";
import { postStatus } from "utils/constants.js";
import DashBoardHeading from "../dashboard/DashBoardHeading.js";

const PostUpdate = () => {
  const [postList, setpostList] = useState([]);
  const [selectPost, setSelectPost] = useState("");

  const { control, watch, setValue, getValues, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 1,
      title: "",
      slug: "",
      hot: false,
      image: "",
      category: {},
      user:{},
    },
  });
  const updatePostHandle = ()=>{}
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    image,
    progress,
    handleResetUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const handleSelectOption = ()=>{};
  return (
    <>
      <DashBoardHeading title="Update post" desc="Update post" className="dashboard-heading"></DashBoardHeading>
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
        <div className="grid grid-cols-3 mb-10 gap-x-10">
          <Field>
            <Label>Feature Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Author</Label>
            <Input
              name="author"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {postList.map((option) => (
                  <Dropdown.Option
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.name}
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown>
            {selectPost?.title && (
              <span className="inline-block p-3 mt-1 text-sm font-medium bg-green-200 rounded-lg color-green">
                {selectPost?.title}
              </span>
            )}
          </Field>
        </div>

        <Button
          // isLoading={loading}
          // disabled={loading}
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
        >
          Add new post
        </Button>
      </form>
    </>
  )
};

export default PostUpdate;