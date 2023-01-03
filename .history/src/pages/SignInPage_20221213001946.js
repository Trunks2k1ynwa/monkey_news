import { useAuth } from "contexts/auth-context";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import AuthenticationPage from "./AuthenticationPage";

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate("/sign-up");
//   useEffect(() => {
//     if (!userInfo.email) navigate("/sign-up");
//     else navigate("/");
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
  return <AuthenticationPage>
    
  </AuthenticationPage>
};

export default SignInPage;
