import React from "react";
import styled from "styled-components";

const Button = ({type='button',onClick=()=>{}, children, ...props }) => {
  const ButtonStyles = styled.button`
    padding: 20px;
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
    width: 200px;
    margin: 0 auto;
    height: 70px;
    &:disabled{
      opacity: 0.5;
      pointer-events: none;

    }
  `;
  return <ButtonStyles type={type} onClick={onClick} {...props}>{children}</ButtonStyles>;
};

export default Button;
