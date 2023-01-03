import Heading from "components/layout/Heading";
import PostNewestItem from "module/post/PostNewestItem";
import PostNewestLarge from "module/post/PostNewestLarge";
import React, { useState } from "react";
import styled from "styled-components";
import { query, collection,where,limit,onSnapshot} from "firebase/firestore";
const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`;

const HomeNewest = () => {
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
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge></PostNewestLarge>
          <div className="sidebar">
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          {/* <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem> */}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;