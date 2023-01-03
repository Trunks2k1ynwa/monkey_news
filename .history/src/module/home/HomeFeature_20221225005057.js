import Heading from "components/layout/Heading";
import PostFeatureItem from "module/post/PostFeatureItem";
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "firebase-app/firebase-config";
import { query, collection, getDocs,addDoc,where,limit} from "firebase/firestore";
const HomeFeatureStyles = styled.div`
  
`;

const HomeFeature = () => {
  useEffect(() => {
    const colRef = collection(db,'Posts');
    const q = query(colRef,where("status","==",1),where("hot","==",true),limit(3));
  }, [])
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
