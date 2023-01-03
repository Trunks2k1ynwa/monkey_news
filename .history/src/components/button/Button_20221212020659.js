import LoadingSpinner from "./loading/LoadingSpinner";
import React from "react";
import styled from "styled-components";

  const ButtonStyles = styled.button`
    background: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    border-radius: 8px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    width: 100%;
    margin: 0 auto;
    height: 55px;
    &:disabled{
      opacity: 0.5;
      pointer-events: none;

    }
  `;
const Button = ({type='button',onClick=()=>{}, children, ...props }) => {
  const {isLoading} = props;
  const child = !!isLoading ? <LoadingSpinner size="30px"></LoadingSpinner>:children;
  return <ButtonStyles type={type} onClick={onClick} {...props}>{child}</ButtonStyles>;
};

export default Button;
