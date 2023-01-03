import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useEffect } from "react";
import { useForm } from "../../node_modules/react-hook-form/dist/useForm";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import AuthenticationPage from "./AuthenticationPage";

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate("/sign-up");
  const {handleSubmit} = useForm({
    mode:'onChange',
  })
  //   useEffect(() => {
  //     if (!userInfo.email) navigate("/sign-up");
  //     else navigate("/");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);
  return (
    <AuthenticationPage>
      <form action="" className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            control={control}
            type="text"
            className="input"
            name="fullname"
            placeholder="Enter your fullname"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
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
