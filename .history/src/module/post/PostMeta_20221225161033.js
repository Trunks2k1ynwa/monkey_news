import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import moment from "../../../node_modules/moment/moment.js";
const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;
const PostMeta = ({
  time = "Mar 23",
  authorName = "Andiez Le",
  className = "",
  to = "/",
}) => {
  console.log(date);
  const time = moment(date.seconds).format("DD-MM-YYYY");
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
        <span className="post-time">{time}</span>
        <span className="post-dot"></span>
      <NavLink to={to}>
        <span className="post-author">{authorName}</span>
      </NavLink>
    </PostMetaStyles>
  );
};

export default PostMeta;
