import React from 'react';
import styled from 'styled-components';

const Button = ({children,props}) => {
  const ButtonStyles=styled.button`
  padding: 2px;
  `
  return (
    <ButtonStyles>
      {children}
    </ButtonStyles>
  );
};

export default Button;