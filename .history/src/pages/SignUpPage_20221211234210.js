import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
// import Label from "../components/label/Label";
import Label from "../components/label/Label";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import Field from "../components/field/Field";

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
    formState: { error, isValid, isSubmiting },
    watch,
  } = useForm({});
  const handleSignUp = (values) => {
    console.log(values);
  };
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
      <form action="" className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            control={control}
            type='password'
            className="input"
            name="fullname"
            placeholder="Enter your full name"
          >
              <IconEyeOpen
                className="icon-eye"
              ></IconEyeOpen>
           
          </Input>
        </Field>
      </form>
    </SignUpPageStyles>
  );
};

export default SignUpPage;