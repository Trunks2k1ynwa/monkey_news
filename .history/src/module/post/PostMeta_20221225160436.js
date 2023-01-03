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
  date = "Mar 23",
  authorName = "Andiez Le",
  className = "",
  to = "/",
}) => {
  const time = moment(`${date}`).moment().calendar
  console.log(time)
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
        <span className="post-time"></span>
        <span className="post-dot"></span>
      <NavLink to={to}>
        <span className="post-author">{authorName}</span>
      </NavLink>
    </PostMetaStyles>
  );
};

export default PostMeta;
