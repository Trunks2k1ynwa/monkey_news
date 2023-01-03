import React from 'react';
import styled from 'styled-components';
const PostMetaStyles = styled.div`

`
const PostMeta = () => {
    return (
        <PostMetaStyles>
             <span className="post-time">Mar 23</span>
            <span className="post-dot"></span>
            <span className="post-author">Andiez Le</span>
        </PostMetaStyles>
    );
};

export default PostMeta;