import React from "react";
import styled from "styled-components";
import { theme } from "../utils/constants";

const SignUpPageStyles = styled.div`
  /* background-color:${(props) => props.theme.primary};//scp */
  /* background-color:${theme.primary}; */
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 40px;
  }
  .field{
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    label {
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
    }
    input.input {
      outline: none;
      background-color: ${props => props.theme.grayF3};
      font-weight: bold;
      font-style: italic;
      padding: 15px;
      border-radius: 5px;
    }
    input.input:focus{
      border-color: ${props => props.theme.primary};;
    }
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
      <form action="">
        <div className="field">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            className="input"
            name="fullname"
            id="fullname"
            placeholder="Enter your full name"
          />
        </div>
      </form>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
