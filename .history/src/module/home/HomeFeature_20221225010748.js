import Heading from "components/layout/Heading";
import PostFeatureItem from "module/post/PostFeatureItem";
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "firebase-app/firebase-config";
import { query, collection, getDocs,addDoc,where,limit,onSnapshot} from "firebase/firestore";
import { useState } from "react";
const HomeFeatureStyles = styled.div`
  
`;

const HomeFeature = () => {
  const [post, setPost] = useState([])
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
      setPost(results)
    })
  }, [])
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {/* <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem> */}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
