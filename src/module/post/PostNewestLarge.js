import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 12px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  return (
    <PostNewestLargeStyles>
      <PostImage to={data?.slug} url={data.image} alt="" />
      <PostCategory>{data.category.name}</PostCategory>
      <PostTitle size="big">{data.title}</PostTitle>
      <PostMeta
        className="post-info"
        date={new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
          "vi-VI"
        )}
        authorName={data?.user?.fullname}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
