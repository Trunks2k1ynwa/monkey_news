import { times } from "lodash";
import React from "react";
import styled from "styled-components";

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
  const HeaderStyles = styled.div`
    .header-main {
      display: flex;
      align-items: center;
    }
    .logo {
      display: block;
      max-width: 50px;
    }
    .menu {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  `;
const Header = () => {
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <a href="/">
            <img className="logo" srcSet="/logo.png 2x" alt="Monkey-Blogging" />
          </a>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li key={item.title} className="menu-item">
                <a href={item.url} className="menu-link">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
