import React from "react";
import styled from "styled-components";

const PostTitleStyles = styled.h3``;
const PostTitle = ({ childrent }) => {
  return <PostTitleStyles>{children}</PostTitleStyles>;
};

export default PostTitle;
