import { useAuth } from "contexts/auth-context";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/index";

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate("/sign-up");
  useEffect(() => {
    if (!userInfo.email) navigate("/sign-up");
    else navigate("/");
  }, []);
  return <div></div>;
};

export default SignInPage;
