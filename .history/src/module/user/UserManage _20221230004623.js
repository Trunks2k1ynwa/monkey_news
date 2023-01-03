import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import Button from "../../components/button/Button.js";
import UserTable from "./UserTable.js";

const UserManage = () => {
  return (
    <div>
      <DashBoardHeading
        title="Users"
        desc="Manage your user"
      >
      <Button kind="ghost" height="60px" to="/manage/add-category">
        Create category
      </Button>
      </DashBoardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
