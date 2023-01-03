import React from 'react';
import styled from 'styled-components';

const Button = ({children,props}) => {
  const ButtonStyles=styled.button`
  `
  return (
    <ButtonStyles>
      {children}
    </ButtonStyles>
  );
};

export default Button;