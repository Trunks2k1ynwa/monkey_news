import React from 'react';
import { useState } from 'react';
import Heading from '../../components/layout/Heading.js';
import PostItem from './PostItem.js';

const PostRelated = ({categoryId=""}) => {
    const [post,setPost] = useState([]);
    if(post.length < 0) return null;
    if(!categoryId) return null;
    return (
        <div className="post-related">
        <Heading>Bài viết liên quan</Heading>
        <div className="grid-layout grid-layout--primary">
          <PostItem ></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div>
      </div>
    );
};

export default PostRelated;