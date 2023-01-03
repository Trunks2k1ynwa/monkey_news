import Button from "components/button/Button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
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
    gap: 10px;
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
    font-weight: 600;
    flex: 1;
  }
  .search {
    margin-left: auto;
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    position: relative;
    margin-right: 20px;
  }
  .header-button {
    text-align: left;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 600;
    background-color:#EFF2FE;

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
function getLastName(name) {
  if (!name) return "";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img className="logo" srcSet="/logo.png 2x" alt="Monkey-Blogging" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li key={item.title} className="menu-item">
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="search">
            <input
              placeholder="Search post..."
              type="text"
              className="search-input"
            />
            <span className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
          {!userInfo ? (
            <Button
              type="button"
              to="/sign-up"
              style={{ maxWidth: "200px" }}
              height="56px"
              className="header-button"
            >
              Sign Up
            </Button>
          ) : (
            <div className="header-auth">
              <span>Wellcome back,</span>
              <NavLink to="/dashboard">
              <strong to="/dashboard" className="cursor-pointer text-primary">
                {getLastName(userInfo?.displayName)}
              </strong>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
