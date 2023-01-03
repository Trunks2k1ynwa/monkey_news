import { times } from "lodash";
import React from "react";
import styled from "styled-components";

const Header = () => {
  const HeaderStyles = styled.div``;
  const menuLinks = [
    {
      url: "/#",
      title: "Home",
    },
    {
      url: "/about",
      title: "About",
    },
    {
      url: "/blog",
      title: "Blog",
    },
  ];
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <a href="/">
            <img srcSet="/logo.png 2x" alt="Monkey-Blogging" />
          </a>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li key={item.title} className="menu-item">
                <a href={item.url} className="menu-link">{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
