import LoadingSpinner from "../loading/LoadingSpinner";
import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
const ButtonStyles = styled.button`
  ${(props) =>
    props.kind === "secondary" &&
    css`
      background: linear-gradient(
        to left top,
        ${(props) => props.theme.secondary},
        ${(props) => props.theme.primary}
      );
      color: ${(props) => props.theme.grayLight};
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      background: linear-gradient(
        to left bottom,
        ${(props) => props.theme.accent},
        ${(props) => props.theme.secondary}
      );
      color: ${(props) => props.theme.black};
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  max-width: 100%;
  padding: 0 20px;
  display: block;
  height: ${(props) => props.height || "66px"};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' || 'submit'
 * @returns
 */
const Button = ({
  to,
  kind = "secondary",
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? (
    <LoadingSpinner size="30px"></LoadingSpinner>
  ) : (
    children
  );
  if (to !== "" && typeof to === "string")
    return (
      <NavLink to={to} className="inline-block">
        <ButtonStyles kind={kind} type={type} onClick={onClick} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  return (
    <ButtonStyles disabled kind={kind} type={type} onClick={onClick}  {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
