import React from "react";
import styled from "styled-components";

const Header = () => {
  const HeaderStyles = styled.div``;
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <a href="/">
            <img srcSet="/logo.png 2x" alt="Monkey-Blogging" />
          </a>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
