import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashBoardHeading";
import React, { useEffect } from "react";
import { useState } from "react";
import { collection,query,where,limit,getDocs,onSnapshot, } from "firebase/firestore"
import { db } from "../../firebase-app/firebase-config.js";
let POST_PER_PAGE ;
const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [LoadDoc, setLoadDoc] = useState();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "Posts");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
        // Chức năng load more
        // Lấy ra limit dòng đầu tiên như ở trên
      const documentSnapshots = await getDocs(newRef);
      // gán 2 dòng đó vào biến lastVisible
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // onSnapshot tức là action realtime
      onSnapshot(newRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
      });
      setLoadDoc(lastVisible);

    }
    fetchData();
  }, [filter]);
  const handleLoadPost = ()=>
  {
    console.log('onlic')
    POST_PER_PAGE +=1;
  }
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="flex justify-end gap-5 mb-10">
        <div className="w-full max-w-[200px]">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
          </Dropdown>
        </div>
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {postList.length>0 && postList.map((post,index)=>(
          <tr key={post.id}>
            <td>{index}</td>
            <td>
              <div className="flex items-center gap-x-3">
                <img
                  src={post.image}
                  alt=""
                  className="w-[66px] h-[55px] rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{post.title.slice(0,20)}</h3>
                  <time className="text-sm text-gray-500">
                    {new Date(post.createdAt.seconds*1000).toLocaleDateString("vi-VI")}
                  </time>
                </div>
              </div>
            </td>
            <td>
              <span className="text-gray-500">Camera Gear</span>
            </td>
            <td>
              <span className="text-gray-500">Evondev</span>
            </td>
            <td>
              <div className="flex items-center text-gray-500 gap-x-3">
                <span className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
                <span className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </span>
                <span className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </span>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <div className="mt-10 text-center">
        {/* <Pagination></Pagination> */}
        <Button onClick = {handleLoadPost} disabled={false} kind="ghost" className="mx-auto w-[200px]">
          See more+
        </Button>
      </div>
    </div>
  );
};

export default PostManage;