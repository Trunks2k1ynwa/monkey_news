import React from "react";
import Table from "components/table/Table.js";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "firebase-app/firebase-config.js";
import { useState } from "react";
import ActionEdit from "components/action/ActionEdit.js";
import ActionDelete from "components/action/ActionDelete.js";
import { useNavigate } from "react-router-dom";
import LabelStatus from "components/label/LabelStatus.js";
import { userStatus } from "utils/constants.js";
const UserTable = () => {
  const naviage = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsers(results);
    });
  }, []);
  const handelDeleteUser = () => {};
  const renderLabelStatus = (status)=>{
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>
      case userStatus.BAN:
        return <LabelStatus type="danger">Reject</LabelStatus>
      default:
        return
    }
  }
  if(users.length>0){
    console.log(users[0].createdAt.seconds);
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length>0 && users.map((user) => (
            <tr key={user.id}>
              <td title={user.id}>{user.id.slice(0, 5) + "....."}</td>
              <td className="whitespace-nowrap">
                <div className="flex items-center gap-x-3">
                  <img
                    className="flex-shrink-0 w-[40px] object-cover aspect-square rounded-full"
                    src={user?.avatar}
                    alt=""
                  />
                  <div className="flex-">
                    <h3 className="">{user?.fullname}</h3>
                    <time className="text-sm text-gray-500">
                      {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
                    </time>
                  </div>
                </div>
              </td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{renderLabelStatus(user?.status)}</td>
              <td>{user?.role}</td>
              <td>
                {" "}
                <div className="flex gap-5 text-gray-400">
                  <ActionEdit
                    onClick={() => naviage(`/manage/update-user?id=${user.id}`)}
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handelDeleteUser(user.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;