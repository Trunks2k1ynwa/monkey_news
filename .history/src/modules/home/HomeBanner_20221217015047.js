import Layout from 'components/layout/Layout';
import React from 'react';
import styled from 'styled-components';
const HomaBannerStyles = styled.div `
    height: 520px;
    background-image: linear-gradient(to right bottom,${
    props => props.theme.primary
},${
    props => props.theme.secondary
});
    `
const HomeBanner = () => {
        return (<HomaBannerStyles>
            <div className="container">
                <div className="banner"></div>
                <div className="banner-content"></div>
                <div className="banner-img"></div>
        </div>
    </HomaBannerStyles>
    );
};

export default HomeBanner;
