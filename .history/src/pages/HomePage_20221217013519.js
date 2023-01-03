import {auth} from "firebase-app/firebase-config";
import React from "react";
import {signOut} from "firebase/auth";
import styled from "styled-components";
import Header from "components/layout/Header";
import HomeBanner from "modules/home/HomeBanner";
const HomePageStyles = styled.div ``;
const HomePage = () => {
    return (
        <HomePageStyles>
            <Layout>
                <HomeBanner></HomeBanner>

            </Layout>
        </HomePageStyles>
    );
};

export default HomePage;
