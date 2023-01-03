import { auth } from "firebase-app/firebase-config";
import React from "react";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Header from "components/layout/Header";
const HomePageStyles = styled.div``;
const HomePage = () => {
  return (
    <HomePageStyles>
      <Header></Header>
    </HomePageStyles>
  );
};

export default HomePage;
