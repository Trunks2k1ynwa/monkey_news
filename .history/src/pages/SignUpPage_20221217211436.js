import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import Field from "../components/field/Field";
import { useState } from "react";
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
import {
  NavLink,
  useNavigate,
} from "../../node_modules/react-router-dom/index";
import InputPasswordToggle from "components/input/InputPasswordToggle";

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
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
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
            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
          <div className="have-account">
            You already have an account ?{" "}
            <NavLink to={"/sign-in"}>Login</NavLink>
          </div>
          <Button
            kind="secondary"
            isLoading={isSubmitting}
            style={{ width: 200, margin: "0 auto" }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && "ds"}
            Sign Up
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
