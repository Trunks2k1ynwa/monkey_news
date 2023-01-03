
import React from "react";
import styled from "styled-components";
// import Label from "../components/label/Label";
import Label from "../components/label/Label";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading{
    color:${props => props.theme.primary};
    text-align: center;
    font-weight: bold;
    font-size:50px;
  }
  .form{
    width: 100%;
    max-width: 600px;
    margin:40px auto;
    
    .field{
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      input.input {
        background-color: ${props => props.theme.grayF3};
        font-weight: bold;
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
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      <h1 className="heading">Monkey Blogging</h1>
      <form action="" className="form">
        <div className="field">
          <Label htmlFor="fullname">Fullname</Label>
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
