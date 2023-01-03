import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "components/image/ImageUpload.js";
import { userRole, userStatus } from "utils/constants.js";
import useFirebaseImage from "hooks/useFirebaseImage.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config.js";
import { collection,addDoc,serverTimestamp } from "firebase/firestore"
import slugify from "slugify/slugify.js";
import { toast } from "react-toastify";
const UserAddNew = () => {
  const { control, handleSubmit, setValue, watch,reset, getValues,formState:{isValid,isSubmitting} } = useForm({
    mode: "onChange",
    defaultValues:{
      email:"",
      password: "",
      fullname: "",
      username:"",
      avatar:  "",
      status :userStatus.ACTIVE,
      role:userRole.USER,
      createAt:new Date(),
    }
  });
  const handleCreateUser = async (values) => {
    if(!isValid) return null;
    try {
      await createUserWithEmailAndPassword(auth,values.email,values.password);
    await addDoc(collection(db,'Accounts'),{
      email:values.email,
      password: values.password,
      fullname: values.fullname,
      username:slugify(values.username || values.fullname,{lower:true,replacement:"",trim:true}),
      avatar:  image,
      status :Number(values.status),
      role:Number(values.role),
      createAt:serverTimestamp(),
    })
    toast.success("Create new user successfully");
    reset({
      email:"",
      password: "",
      fullname: "",
      username:"",
      avatar:  image,
      status :userStatus.ACTIVE,
      role:userRole.USER,
      createAt:new Date(),
    })
    handleResetUpload();
    } catch (error) {
      toast.error("Can not create new user: "+error.message)
    }
    
  }

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    image,
    progress,
    handleResetUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="form-layou w-[300px] h-[300px] mx-auto border-primary bg-gray-200 border-4 rounded-full overflow-hidden mb-10">
          <ImageUpload
            image={image}
            progress={progress}
            type="file"
            name="image"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            className="!rounded-full"
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
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
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.EDITOR}
                value={userRole.EDITOR}
              >
                Editor
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          kind="primary"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
