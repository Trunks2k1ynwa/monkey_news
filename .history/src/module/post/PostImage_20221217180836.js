import React from "react";
import styled from "styled-components";
const PostImageStyles = styled.div`
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
}
`;
const PostImage = ({ className = "", url = "", alt = "" }) => {
  return (
    <PostImageStyles className={`post-image ${className}`}>
    <div className="post-image">
      <img src={url} alt={alt} loading="lazy" />
    </div>
    </PostImageStyles>
  );
};

export default PostImage;
