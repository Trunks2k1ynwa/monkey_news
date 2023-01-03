import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
  }
  &-category {
    margin-bottom: 16px;
  }
  &-title {
    margin-bottom: 8px;
    color: black;
  }
`;

const PostItem = ({data}) => {
  console.log(data);
  // {title,createdAt,category,image,user}
  // console.log(image,title)
  return (
    <PostItemStyles>
      <PostImage
        url={image}
        alt=""
      />
      <PostCategory>{category?.name}</PostCategory>
      <PostTitle>
        {title}
      </PostTitle>
      <PostMeta className="post-info"></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
