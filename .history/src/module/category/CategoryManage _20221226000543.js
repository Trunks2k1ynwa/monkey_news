import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashBoardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import { onSnapshot,collection } from "firebase/firestore"
import { db } from "../../firebase-app/firebase-config.js";
const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
  const colRef = collection(db,"Categories");
  onSnapshot(colRef,snapshot=>{
    const results = [];
    snapshot.forEach(doc => {
      results.push({
        id:doc.id(),
        ...doc.data()

      })
    });
    setCategoryList(results);
  })
  }, [])
  console.log(categoryList);
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
          <tr>
            <td>01</td>
            <td>Frontend Developer</td>
            <td>
              <em className="text-gray-400">frontend-developer</em>
            </td>
            <td>
              <LabelStatus type="success">Approved</LabelStatus>
            </td>
            <td>
              <div className="flex gap-5 text-gray-400">
                <ActionView></ActionView>
                <ActionEdit></ActionEdit>
                <ActionDelete></ActionDelete>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;