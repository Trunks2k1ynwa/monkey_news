import React from 'react';
import styled from 'styled-components';
const HomaBannerStyles = styled.div `
    height: 520px;
    background-image: linear-gradient(to right bottom,${
    props => props.theme.primary
},${
    props => props.theme.secondary
});
.banner{
    display:flex;
justify-content: space-between;
align-items: center;
}
    `
const HomeBanner = () => {
    return (
        <HomaBannerStyles>
            <div className="container">
                <div className="banner"></div>
                <div className="banner-content">
                    <h1 className="banner-heading">Monkey Blogging</h1>
                    <p className="banner-dsc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum esse, illo magnam molestiae et doloremque, cum nihil tempora vel minus sit blanditiis quas aperiam amet nostrum veniam dignissimos odit. Quam?</p>
                    <div className="banner-img">
                        <img src="/img-banner.png" alt="banner"/>
                    </div>
                </div>
            </div>
        </HomaBannerStyles>
    );
};

export default HomeBanner;
