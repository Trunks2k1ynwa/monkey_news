import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import UserTable from "./UserTable.js";

const UserManage = () => {
  return (
    <div>
      <DashBoardHeading
        title="Users"
        desc="Manage your user"
        <UserTable>
          
        </UserTable>
      ></DashBoardHeading>
    </div>
  );
};

export default UserManage;