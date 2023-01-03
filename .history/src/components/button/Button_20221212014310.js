import React from 'react';
import styled from 'styled-components';

const Button = ({onClick,children,props}) => {
  const ButtonStyles = styled.button`
  padding: 20px;
  background: linear-gradient(107.61deg, #00A7B4 15.59%, #A4D96C 87.25%);
  border-radius: 8px;
  color:white;
  font-size:18px;
  font-weight:bold;
  line-height: 1;
  width: 100%;
  max-width:200px;
  text-align:center;
  `
  return (
    <ButtonStyles>
      {children}
    </ButtonStyles>
  );
};

export default Button;