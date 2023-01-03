import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
    margin-bottom: 5px;
    }
    &-title{
      color: black;
    }
  }
`;
const PostNewestItem = ({data}) => {
  return (
    <PostNewestItemStyles>
        <PostImage
         to={data?.slug} url={data.image} alt=""
        />
      <div className="post-content">
        <PostCategory type="secondary">{data.category.name}</PostCategory>
        <PostTitle se>
        {data.title}
        </PostTitle>
        <PostMeta 
         date={new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
          "vi-VI"
        )}
        authorName={data?.user?.fullname}
        className="post-info">
        </PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;