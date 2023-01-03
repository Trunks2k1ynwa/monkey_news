import { auth } from "firebase-app/firebase-config";
import React from "react";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Header from "components/layout/Header";
const HomePage = () => {
  const HomePageStyles = styled.div``;
  return (
    <HomePageStyles>
      <Header></Header>
    </HomePageStyles>
  );
};

export default HomePage;
