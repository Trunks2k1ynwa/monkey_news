import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashBoardHeading";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  deleteDoc,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config.js";
import ActionView from "components/action/ActionView.js";
import ActionDelete from "components/action/ActionDelete.js";
import ActionEdit from "components/action/ActionEdit.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const POST_PER_PAGE = 2;
const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [LoadDoc, setLoadDoc] = useState();
  const navigate = useNavigate();
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
  const handleLoadPost = () => {

  };
  const handleDeletePost = async (postId) => {
    const docRef = doc(db, "Ports", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteDoc(docRef);
      }
    });
  };
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
          {postList.length > 0 &&
            postList.map((post, index) => (
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
                      <h3 className="font-semibold">
                        {post.title.slice(0, 20) + "..."}
                      </h3>
                      <time className="text-sm text-gray-500">
                        {new Date(
                          post.createdAt.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
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
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                    </span>
                    <span className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer">
                      <ActionEdit></ActionEdit>
                    </span>
                    <span className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer">
                      <ActionDelete
                        onClick={() => handleDeletePost(post.id)}
                      ></ActionDelete>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-10 text-center">
        {/* <Pagination></Pagination> */}
        <Button
          onClick={handleLoadPost}
          disabled={false}
          kind="ghost"
          className="mx-auto w-[200px]"
        >
          See more+
        </Button>
      </div>
    </div>
  );
};

export default PostManage;
