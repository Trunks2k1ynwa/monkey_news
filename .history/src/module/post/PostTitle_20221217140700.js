import React from "react";
import styled from "styled-components";

const PostTitleStyles = styled.h3`
    
    `;
const PostTitle = ({ children,className }) => {
  return <PostTitleStyles className={`post-title ${className}`}>{children}</PostTitleStyles>;
};

export default PostTitle;
