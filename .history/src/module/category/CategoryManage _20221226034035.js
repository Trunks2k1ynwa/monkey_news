import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashBoardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import { onSnapshot, collection,doc,deleteDoc,where,query } from "firebase/firestore";
import { db } from "firebase-app/firebase-config.js";
import { categoryStatus } from "utils/constants.js";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const CategoryManage = () => {
  const naviage = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const inputRef = useRef("")
  useEffect(() => {
    const colRef = collection(db, "Categories");
    const newRef = inputRef.current.value ? query(colRef, where("name","==",inputRef.current.value)):colRef;
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
  }, [inputRef]);
  const handelDeleteCategory = async (id)=>{
    const colRef = doc(db,"Categories",id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
          await await deleteDoc(colRef);
      }
    })

  }
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
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
                    <ActionEdit onClick={()=>naviage(`/manage/update-category?id=${category.id}`)}></ActionEdit>
                    <ActionDelete onClick = {()=>handelDeleteCategory(category.id)}></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
