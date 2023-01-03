import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Heading from "../../components/layout/Heading.js";
import PostItem from "./PostItem.js";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config.js";
const PostRelated = ({ categoryId = "" }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(results);
    });
  }, [categoryId]);
  if (post.length < 0) return null;
  if (!categoryId) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {post.map((post) => (
          <PostItem data={post} key={post.id}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
