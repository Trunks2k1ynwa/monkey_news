import React from "react";
import ImageUpload from "../../components/image/ImageUpload.js";
import DashBoardHeading from "../dashboard/DashBoardHeading.js";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import { userRole, userStatus } from "utils/constants.js";
import useFirebaseImage from "hooks/useFirebaseImage.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config.js";
import { collection, addDoc, serverTimestamp,doc,getDoc } from "firebase/firestore";
import slugify from "slugify/slugify.js";
import { toast } from "react-toastify";
import { useSearchParams } from "../../../node_modules/react-router-dom/index.js";
import { useEffect } from "react";
const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    retset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [params] = useSearchParams();
  const userId = params.get("id");
  const handleUpdateUser = async (values) => {
    if (!isValid) return null;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        email: values.email,
        password: values.password,
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: "",
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createAt: serverTimestamp(),
      });
      toast.success("Update user successfully");
      reset({
        email: "",
        password: "",
        fullname: "",
        username: "",
        avatar: image,
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createAt: new Date(),
      });
      handleResetUpload();
    } catch (error) {
      toast.error("Can not update user: " + error.message);
    }
  };
  const {
    image,
    progress,
    handleResetUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  useEffect(() => {
  async function fetchData () {
    const colRef = doc(db,"users",userId);
    const docData = await getDoc(colRef);
    reset(docData && docData.data())
  }
  fetchData();  
  }, [userId]);
  if (!userId) return null;
  return (
    <div>
      <DashBoardHeading
        title="New user"
        desc="Update user to system"
      ></DashBoardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="form-layou w-[300px] h-[300px] mx-auto border-primary bg-gray-200 border-4 rounded-full mb-10">
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
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
