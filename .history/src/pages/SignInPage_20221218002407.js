import Button from "components/button/Button";
import Field from "components/field/Field";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { NavLink } from "react-router-dom";
import InputPasswordToggle from "components/input/InputPasswordToggle";

// Khai báo Schema để xác định khi có lỗi
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
  // Get userInfo từ context để lưu thông tin user
  const { userInfo } = useAuth();

  // Khai báo navigate để chuyển trang
  const navigate = useNavigate("/sign-up");
  useEffect(() => {
    // components mounted xong sẽ hiện title Login page or thì userInfo thay đổi
    document.title = "Login Page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  // Khi click nút submit của form
  const handleSignUp = async (values) => {
    // values là giá trị từ form khi nhập vào

    // Kiểm tra đã Validate chưa, nếu chưa thì thoát
    if (!isValid) return;
    // Nếu Validate rồi thì chuyển đến trang HomeBanner
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

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
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Do not have an account ? <NavLink to={"/sign-up"}>Register</NavLink>
        </div>
        <Button
          isLoading={isSubmitting}
          className="w-full max-w-[200px] mx-auto "
          type="submit"
          disabled={isSubmitting}
          kind="primary"
        >
          {isSubmitting && "ds"}
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
