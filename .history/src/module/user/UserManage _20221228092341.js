import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import UserTable from "./UserTable.js";

const UserManage = () => {
  return (
    <div>
      <DashBoardHeading>
        title="Users"
        desc="Manage your user"
        </DashBoardHeading>
        <UserTable>
          
        </UserTable>
    </div>
  );
};

export default UserManage;