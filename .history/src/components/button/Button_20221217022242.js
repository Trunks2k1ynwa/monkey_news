import LoadingSpinner from "../loading/LoadingSpinner";
import React from "react";
import styled,{css} from "styled-components";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
${props=> props.kind === 'primary' && css`
background: linear-gradient(
  to right bottom,
  ${(props) => props.theme.primary},
  ${(props) => props.theme.secondary}
);
`};
  border-radius: 8px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  max-width: 100%;
  padding: 0 25px;
  display: block;
  height: ${(props) => props.height || "66px"};
  &:disasbled {
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
  if (to !== "" && typeof(to) === 'string')
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} onClick={onClick} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  return (
    <ButtonStyles type={type} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
