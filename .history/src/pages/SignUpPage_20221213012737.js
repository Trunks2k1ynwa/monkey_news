import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import Field from "../components/field/Field";
import { useState } from "react";
import IconEyeClose from "../components/icon/IconEyeClose";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import AuthenticationPage from "./AuthenticationPage";
import { NavLink, useNavigate } from "../../node_modules/react-router-dom/index";

const SignUpPageStyles = styled.div``;

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("please enter valid email address")
    .required("please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 Character or greater")
    .required("please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    resetForm,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [showIconEye, setShowIconEye] = useState(true);

  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success("Register successfully🤗🤗");
    navigate("/");
  };
  useEffect(() => {
    document.title = "Register page";
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 100,
        duration: 1000,
        icon: "😶‍🌫️",
      });
    }
  }, [errors]);
  return (
    <SignUpPageStyles>
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
          <div className="have-account">You already have an account ? <NavLink to={'/sign-in'}>Login</NavLink></div>
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
    </SignUpPageStyles>
  );
};

Button.prototype = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.bool,
};
export default SignUpPage;
