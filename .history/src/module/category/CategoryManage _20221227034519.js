import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashBoardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  getDocs,
  where,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config.js";
import { categoryStatus } from "utils/constants.js";
import Swal from "sweetalert2/src/sweetalert2.js";
import { useNavigate } from "react-router-dom";
const CategoryManage = () => {
  const naviage = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [loadDoc, setLoadDoc] = useState([]);
  const handleLoadmore = async () => {
    const first = query(collection(db, "Categories"), limit(1));
    const documentSnapshots = await getDocs(first);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const nextRef = query(
      collection(db, "Categories"),
      startAfter(loadDoc),
      limit(1)
    );
    setLoadDoc(nextRef);
    onSnapshot(nextRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });

  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "Categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(1));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLoadDoc(lastVisible);
      // onSnapshot tức là action realtime
      onSnapshot(newRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(results);
      });
      setLoadDoc(nextRef);
    }
    fetchData();
  }, [filter]);
  const handelDeleteCategory = async (id) => {
    const colRef = doc(db, "Categories", id);
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
        await await deleteDoc(colRef);
      }
    });
  };
  const handleFind = () => {
    const input = document.getElementById("input-search");
    setFilter(input.value);
  };
  // const handleFilter = debounce((e)=>{
  //   setFilter(e.target.value);
  // },1000)

  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
        <div className="relative Search">
          <span
            onClick={handleFind}
            className="absolute top-3 left-3 text-lg text-[#00D1ED] fa-solid fa-magnifying-glass cursor-pointer"
          ></span>
          <input
            id="input-search"
            className="w-[300px] p-3 pl-12 rounded border-2 border-[#00D1ED]"
            placeholder="Enter your keyword"
            type="text"
          />
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <em className="text-gray-400">{category.slug}</em>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="danger">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        naviage(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handelDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-10">
        <button onClick={handleLoadmore}>Load more</button>
      </div>
    </div>
  );
};

export default CategoryManage;
