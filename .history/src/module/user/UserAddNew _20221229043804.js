import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "components/image/ImageUpload.js";
import { userRole, userStatus } from "../../utils/constants.js";

const UserAddNew = () => {
  const { control,handleSubmit,setValue,watch } = useForm({
    mode: "onChange",
  });
  const handleCreateUser = (values)=>{
console.log(values);
  }
  const watchStatus = watch("status") ;
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
      <div className="form-layou w-[300px] h-[300px] mx-auto border-primary bg-gray-200 border-4 rounded-full mb-10">
      <ImageUpload className="!rounded-full"></ImageUpload>
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
              <Radio name="status" control={control} checked={Number(watchStatus)===userStatus.ACTIVE} value={userStatus.ACTIVE}>
                Active
              </Radio>
              <Radio name="status" control={control} checked={Number(watchStatus)===userStatus.PENDING} value={userStatus.PENDING}>
                Pending
              </Radio>
              <Radio name="status" control={control} checked={Number(watchStatus)===userStatus.BAN}  value={userStatus.BAN}>
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio name="role" control={control} checked={Number(watchStatus)===userRole.ADMIN}  value={userStatus.ADMIN}>
                Admin
              </Radio>
              <Radio name="role" control={control} checked={Number(watchStatus)===userRole.MOD}  value={userStatus.MOD}>
                Moderator
              </Radio>
              <Radio name="role" control={control} checked={Number(watchStatus)===userRole.USER}  value={userStatus.USER}>
                Editor
              </Radio>
              <Radio name="role" control={control}>
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" disabled={false} kind="primary" className="mx-auto w-[200px]">
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;