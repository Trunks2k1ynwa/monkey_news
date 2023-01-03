import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { query, collection,where,limit,onSnapshot} from "firebase/firestore";
import { db } from 'firebase-app/firebase-config.js';
import Heading from '../../components/layout/Heading.js';
import styled from 'styled-components';
import PostItem from '../post/PostItem.js';
const HomeFeatureStyles = styled.div`
  
`;
const HomeOther = () => {
    const [posts, setPosts] = useState([])
    console.log(posts)
    useEffect(() => {
        const colRef = collection(db,'Posts');
        const q = query(colRef,where("categoryId","!=","J6SxbylsEWt0QJ449wk9"),limit(3));
        onSnapshot(q, snapshot => {
          const results = [];
          snapshot.forEach(doc => {
            results.push({
              id:doc.id,
              ...doc.data(),
            })
          });
          setPosts(results)
        })
      }, [])
    return (
      <HomeFeatureStyles className="w-full home-block">
        <div className="container">
          <Heading>Bài viết khác</Heading>
          <div className="grid-layout">
          {
            posts.map(item=>(<PostItem data={item} key={item.id}></PostItem>))
          }
          </div>
        </div>
      </HomeFeatureStyles>
    );
};

export default HomeOther;