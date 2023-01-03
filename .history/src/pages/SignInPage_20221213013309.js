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
import { useNavigate } from "../../node_modules/react-router-dom/index";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { NavLink } from 'react-router-dom'
const schema = yup.object({
  email: yup
    .string()
    .email("please enter valid email address")
    .required("please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 Character or greater")
    .required("please enter your password"),
});
const SignInPage = () => {
  const [showIconEye, setShowIconEye] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate("/sign-up");
    useEffect(() => {
      if (userInfo?.email) navigate("/");
      // else navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSignUp = async (values) => {
      if(!isValid)return;
      await signInWithEmailAndPassword(auth,values.email,values.password)
      navigate("/");
    };
  const {
    handleSubmit,
    control,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });


  useEffect(() => {
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
        <div className="have-account">Do not have an account ? <NavLink to={'/sign-up'}>Register</NavLink></div>
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
