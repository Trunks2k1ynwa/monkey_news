import Layout from 'components/layout/Layout';
import React from 'react';
import styled from 'styled-components';
const HomaBannerStyles = styled.div`
    height: 520px;
    background-image: linear-gradient(to right bottom,${props => props.theme.primary},${props => props.theme.secondary});
    `
const HomeBanner = () => {
    return (
        <HomaBannerStyles>
            <div className="container">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo officia iste odit alias in nihil, harum debitis ab esse soluta veritatis unde laborum quasi est adipisci animi sequi sit eius?
            </div>
        </HomaBannerStyles>
    );
};

export default HomeBanner;