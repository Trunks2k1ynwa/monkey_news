import React from "react";
import styled from "styled-components";
import { theme } from "../utils/constants";

const SignUpPageStyles = styled.div`
  /* background-color:${props => props.theme.primary};//scp */
  /* background-color:${theme.primary}; */
  min-height:100vh;
  padding: 40px;
  .logo{
    margin: 0 auto 20px;
  }
  .heading{
    text-align: center;
    color:${props => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 40px;
  }
  label{
    font-weight: bold;
    font-size:20px;
  }
  input.input{
    outline: none;
    padding: 10px;
    border:1px solid skyblue;
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
      <form action="">
        <label htmlFor="fullname">Fullname</label>
        <input type="text" className="input" name="fullname" placeholder="Enter your full name" />
      </form>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
