import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import Field from "../components/field/Field";
import { useState } from "react";
import IconEyeClose from "../components/icon/IconEyeClose";
import Button from "../components/button/Button";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    color: ${(props) => props.theme.primary};
    text-align: center;
    font-weight: bold;
    font-size: 50px;
  }
  .form {
    width: 100%;
    max-width: 600px;
    margin: 40px auto;
  }
`;
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    resetForm,
  } = useForm({
    // mode: "onChange",
  });
  const [showIconEye, setShowIconEye] = useState(false);
  console.log(isValid);
  const handleSignUp = (values) => {
    if(!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 5000);
    }
);
  };
  React.useEffect(() => {
    console.log(`isSubmitting: ${isSubmitting}`);
  },[isSubmitting])  
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
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
    </SignUpPageStyles>
  );
};

export default SignUpPage;
