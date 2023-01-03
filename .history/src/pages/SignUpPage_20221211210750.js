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
  .form{
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin: auto;
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
      transition: all 0.2s linear;
      border : 1px solid transparent;

    }
    input.input:focus{
      border-color: ${props => props.theme.primary};
      background-color: white;
    }
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
      <form action="" className="form">
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