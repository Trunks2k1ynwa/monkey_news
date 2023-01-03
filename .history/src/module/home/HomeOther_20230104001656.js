import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { query, collection,where,limit,onSnapshot} from "firebase/firestore";
import { db } from 'firebase-app/firebase-config.js';
import Heading from '../../components/layout/Heading.js';
import PostFeatureItem from '../post/PostFeatureItem.js';
import styled from 'styled-components';
const HomeFeatureStyles = styled.div`
  
`;
const HomeOther = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
      const colRef = collection(db,'Posts');
      const q = query(colRef,where("status","==",1),where("hot","==",true),limit(3));
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
      <HomeFeatureStyles className="home-block">
        <div className="container">
          <Heading>Bài viết nổi bật</Heading>
          <div className="grid-layout">
          {
            posts.map(item=>(<PostFeatureItem data={item} key={item.id}></PostFeatureItem>))
          }
          </div>
        </div>
      </HomeFeatureStyles>
    );
};

export default HomeOther;