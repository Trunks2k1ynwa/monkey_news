import Button from "components/button/Button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import slugify from "../../../node_modules/slugify/slugify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue,handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      status:1,
      category: "",
      title:"",
      slug: "",
    },
  });
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const addPostHandle = async (values)=>{
    const cloneValues = {...values}
      cloneValues.slug = slugify(values.slug || values.title);
      cloneValues.status = Number(values.status)
  }
  const handleUpLoadImage = (e)=>{
    const file = e.target.files[0];
    if(file){

    }
  }
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
          <input type="file" name="image" onChange={handleUpLoadImage} />
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
                value= {postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>


          <Field>
            <Label>Author</Label>
            <Input name='author' control={control} placeholder="Find the author"></Input>
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
        <Button kind='primary' type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;