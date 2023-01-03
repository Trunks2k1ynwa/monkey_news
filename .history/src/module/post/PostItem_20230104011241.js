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

const PostItem = ({ data }) => {
  const { title, createdAt, category,slug, image, user } = data;
  return (
    <PostItemStyles>
      <PostImage to={`/${slug}`} url={image} alt="" />
      <PostCategory>{category?.name}</PostCategory>
      <PostTitle to={`/${slug}`}>{title}</PostTitle>
      <PostMeta
        date={new Date(createdAt.seconds*1000).toLocaleDateString("vi-VI")}
        authorName={user.fullname}
        to={`/${slug}`}
        className="post-info"
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
