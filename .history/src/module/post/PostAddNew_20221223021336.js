import Button from "components/button/Button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ImageUpload from "components/image/ImageUpload";

// use fw slugify to convert input to slug 
let slugify = require('slugify');
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  // state progress upload image
  const [progress, setProgress] = useState(0);
  // state store image upload
  const [image, setImage] = useState("")
  // reacthook form
  const { control, watch, setValue,getValues,handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 1,
      category: "",
      title: "",
      slug: "",
    },
  });
  // watchStatus to save your status by number (1,2,3) follow sort of tag html have name = 'status'
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  // handle when submit add new post
  const addPostHandle = async (values) => {
    // values is values user provite for form
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
  };
  // handle when upload image
  const handleUploadImage = (file) => {

    // code upload image to firestore
    const storage = getStorage();
    const storageRef = ref(storage, `images/"+${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercen =Math.ceil(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // console.log('Upload is ' + progressPercen + '% done');
        setProgress(progressPercen);
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        //   default:
        //     console.log("Nothing at all");
        // }
      },
      (error) => {
        console.log("Erorss");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          // set image upload to state = downloadURL
          setImage(downloadURL)
        });
      }
    );
  }

  // handle select image
  const onSelectImage = (e)=>{
    // get image upload = file
    const file = e.target.files[0];
    if(!file) return;

    // set name of image upload to state value of reachookform  = setValue
    setValue("image_name",file.name);
    console.log(file.name);
    // upload image file 
    handleUploadImage(file)
  }
  const handleDeleteImage = ()=>{
    const storage = getStorage();
    const imgRef = ref(storage,"images/"+getValues("image_name"));
    console.log(imgRef)
    deleteObject(imgRef)
    .then(()=>{
      console.log('remove image successfully');
      setImage("")
    }).catch((error)=>{
      console.log('can not delete img');
    });
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
            <ImageUpload image={image} progress={progress} type="file" name="image" onChange={onSelectImage} handleDeleteImage={handleDeleteImage} />
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
