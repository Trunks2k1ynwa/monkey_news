import React from "react";
import Table from "components/table/Table.js";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "firebase-app/firebase-config.js";
import { useState } from "react";
import ActionView from "components/action/ActionView.js";
import ActionEdit from "components/action/ActionEdit.js";
import ActionDelete from "components/action/ActionDelete.js";
import { useNavigate } from "react-router-dom";
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
  const handelDeleteCategory = ()=>{}
  return (
    <div>
      <Table>
        <thead>
          <th>ID</th>
          <th>Info</th>
          <th>Username</th>
          <th>Email address</th>
          <th>Status</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
              <td>
                {" "}
                <div className="flex gap-5 text-gray-400">
                  <ActionView></ActionView>
                  <ActionEdit
                    onClick={() =>
                      naviage(`/manage/update-category?id=${user.id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handelDeleteCategory(user.id)}
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
