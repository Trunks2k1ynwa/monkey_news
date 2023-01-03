import Button from "components/button/Button";
import Field from "components/field/Field";
import IconEyeClose from "components/icon/IconEyeClose";
import IconEyeOpen from "components/icon/IconEyeOpen";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "../../node_modules/react-hook-form/dist/useForm";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import AuthenticationPage from "./AuthenticationPage";

const SignInPage = () => {
    const [showIconEye, setShowIconEye] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate("/sign-up");
  const {handleSubmit,control,formState:{isSubmitting}} = useForm({
    mode:'onChange',
  })
  const handleSignUp =()=>{}
  //   useEffect(() => {
  //     if (!userInfo.email) navigate("/sign-up");
  //     else navigate("/");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);
  return (
    <AuthenticationPage>
      <form action="" className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            control={control}
            type="email"
            className="input"
            name="email"
            placeholder="Enter your Email"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            control={control}
            type={showIconEye ? "password" : "text"}
            className="input"
            name="password"
            placeholder="Enter yourpassword"
          >
            {showIconEye ? (
              <IconEyeOpen
                onClick={() => setShowIconEye(!showIconEye)}
                type={true}
              ></IconEyeOpen>
            ) : (
              <IconEyeClose
                onClick={() => setShowIconEye(!showIconEye)}
                type={true}
              ></IconEyeClose>
            )}
          </Input>
        </Field>
        <Button
          isLoading={isSubmitting}
          style={{ width: 200, margin: "0 auto" }}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && "ds"}
          Sign up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
