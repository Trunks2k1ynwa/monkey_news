import React from "react";
import styled from "styled-components";
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
