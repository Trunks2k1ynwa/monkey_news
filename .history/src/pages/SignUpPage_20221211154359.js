import React from "react";
import styled from "styled-components";
import { theme } from "../utils/constants";

const SignUpPageStyles = styled.div`
  background-color:${props => props.theme.primary};//scp
  /* background-color:${theme.primary}; */
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <h1>sdjfk</h1>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
