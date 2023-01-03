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
const CATEGORY_PER_PAGE = 2;

const CategoryManage = () => {
  const naviage = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [loadDoc, setLoadDoc] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLoadmore = async () => {
    const nextRef = query(
      collection(db, "Categories"),
      startAfter(loadDoc || 0),
      limit(CATEGORY_PER_PAGE)
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
      setCategoryList([...categoryList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible);
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
        : query(colRef, limit(CATEGORY_PER_PAGE));
        // Chức năng load more
        // Lấy ra limit dòng đầu tiên như ở trên
      const documentSnapshots = await getDocs(newRef);
      // gán 2 dòng đó vào biến lastVisible
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // onSnapshot tức là action realtime
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
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
      setLoadDoc(lastVisible);
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
        await deleteDoc(colRef);
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
                  <span className="text-gray-400">{category.slug}</span>
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
      {total > categoryList.length && (
        <div className="mt-10">
          <p>
            Hiển thị <span className="font-bold">{categoryList.length}</span>{" "}
            trên{" "}
            <span className="font-bold">{total}</span> category
          </p>
          <Button
            disabled={false}
            className="mx-auto"
            kind="ghost"
            onClick={handleLoadmore}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
