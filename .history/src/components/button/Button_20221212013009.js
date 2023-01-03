import React from 'react';
import styled from 'styled-components';

const Button = ({children,props}) => {
  const ButtonStyles=styled.button`
  padding: 10px 20px;
  background: linear-gradient(107.61deg, #00A7B4 15.59%, #A4D96C 87.25%);
  border-radius: 8px;
  margin: auto;
  text-align: center;
  color:white;
  `
  return (
    <ButtonStyles>
      {children}
    </ButtonStyles>
  );
};

export default Button;