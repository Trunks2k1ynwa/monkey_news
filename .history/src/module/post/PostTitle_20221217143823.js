import React from "react";
import styled from "styled-components";

const PostTitleStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  display: block;
  font-size: 22px;
  color: white;
`;
const PostTitle = ({ children, className="",size="normal" }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      {children}
    </PostTitleStyles>
  );
};

export default PostTitle;
