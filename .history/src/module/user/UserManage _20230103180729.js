import DashBoardHeading from "module/dashboard/DashBoardHeading";
import React from "react";
import Button from "components/button/Button.js";
import { useAuth } from "contexts/auth-context.js";
import { userRole } from "utils/constants.js";
import UserTable from "./UserTable.js";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashBoardHeading
        title="Users"
        desc="Manage your user"
      >
      <Button kind="ghost" height="60px" to="/manage/add-user">
        Create user
      </Button>
      </DashBoardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
