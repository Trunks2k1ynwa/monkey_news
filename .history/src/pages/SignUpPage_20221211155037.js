import React from "react";
import styled from "styled-components";
import { theme } from "../utils/constants";

const SignUpPageStyles = styled.div`
  background-color:${props => props.theme.primary};//scp
  /* background-color:${theme.primary}; */
  min-height:100vh;
  padding: 40px;
  .logo{
    margin: 0 auto 20px;
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
    </SignUpPageStyles>
  );
};

export default SignUpPage;
