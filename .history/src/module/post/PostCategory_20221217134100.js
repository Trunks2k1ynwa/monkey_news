import React from "react";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 8px;
  color: ${props => props.theme.gray6B};;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  background-color: #f3f3f3;
  text-overflow: ellipsis;
  ${props => props.type==='primary' && css`
    background-color: ${props => props.theme.grayF3};;
  `};
`;
const PostCategory = ({ children,type='primary',className='' }) => {
  return <PostCategoryStyles type={type} className={className}>{children}</PostCategoryStyles>;
};

export default PostCategory;
