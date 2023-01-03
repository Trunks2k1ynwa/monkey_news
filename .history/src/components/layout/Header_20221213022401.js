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
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }
  .search {
    margin-left: auto;
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-button,
    .header-auth {
      display: none;
    }
  }
`;
const Header = () => {
  return (
    <HeaderStyles >
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
        <div className="header-right">
<input type="text" className="search-input" />
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
