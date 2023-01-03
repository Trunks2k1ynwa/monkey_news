import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
// import Label from "../components/label/Label";
import Label from "../components/label/Label";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import { useState } from "react";
import IconEyeClose from "../components/icon/IconEyeClose";

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

    .field {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      input.input {
        background-color: ${(props) => props.theme.grayF3};
        font-weight: bold;
        padding: 15px;
        border-radius: 5px;
        transition: all 0.2s linear;
        border: 1px solid transparent;
      }
      input.input:focus {
        border-color: ${(props) => props.theme.primary};
        background-color: white;
      }
    }
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
  const [password, setPassword] = useState({
    status: true,
    type:status?'text':'password',
    element:'IconEyeOpen'
  });
  const handleEyeToggle = (value)=>{
    setPassword({
      ...value,
      type:'password',
      status:!value.status
    })
  }
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
      <form action="" className="form" onSubmit={handleSubmit(handleSignUp)}>
        <div className="field">
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            control={control}
            type={`${password.status?'text':'password'}`}
            className="input"
            name="fullname"
            placeholder="Enter your full name"
          >
          {password.status?
            <IconEyeOpen onClick={handleEyeToggle} className="icon-eye"></IconEyeOpen>:            <IconEyeClose onClick={handleEyeToggle} className="icon-eye"></IconEyeClose>
          }
          </Input>
        </div>
      </form>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
