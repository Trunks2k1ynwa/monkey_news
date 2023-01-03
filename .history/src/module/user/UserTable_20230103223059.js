import React from "react";
import Table from "components/table/Table.js";
import { useEffect } from "react";
import { collection, onSnapshot,deleteDoc,doc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config.js";
import { useState } from "react";
import ActionEdit from "components/action/ActionEdit.js";
import ActionDelete from "components/action/ActionDelete.js";
import { useNavigate } from "react-router-dom";
import LabelStatus from "components/label/LabelStatus.js";
import { userRole, userStatus } from "utils/constants.js";
import { toast } from "react-toastify/dist";
import moment from "node_modules/moment/moment.js";
import Swal from "sweetalert2";
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
  const hanleDeleteUser = async(user)=>{
    const colRef  = doc(db,"Accounts",user.id)
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
        await deleteDoc(colRef);

        // Xóa user trong authencation ko được
        // await deleteUser(user);
        toast.success("Delete user successfully")
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await await deleteDoc(colRef);
      }
    });
  }
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
  const renderLabelRole = (role)=>{
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";
      case userRole.EDITOR:
        return "Editor";
      default:
        return
    }
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
          {users.map((user) => (
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
                    {moment(user?.createdAt?.seconds).format("DD-MM-YYYY")}
                    </time>
                  </div>
                </div>
              </td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{renderLabelStatus(user?.status)}</td>
              <td>{renderLabelRole(user?.role)}</td>
              <td>
                {" "}
                <div className="flex gap-5 text-gray-400">
                  <ActionEdit
                    onClick={() => naviage(`/manage/update-user?id=${user.id}`)}
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => hanleDeleteUser(user)}
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
