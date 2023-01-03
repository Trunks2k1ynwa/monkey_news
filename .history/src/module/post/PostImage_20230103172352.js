import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
const PostImageStyles = styled.div`
height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;
const PostImage = ({ to = "", className = "", url = "", alt = "" }) => {
  if (to)
    return (
      <PostImageStyles className={`post-image ${className}`}>
        <Link style={{display:"block"}} to={to}>
          <img src={url} alt={alt} loading="lazy" />
        </Link>
      </PostImageStyles>
    );
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <img src={url} alt={alt} loading="lazy" />
    </PostImageStyles>
  );
};

export default PostImage;
