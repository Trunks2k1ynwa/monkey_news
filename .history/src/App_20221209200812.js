import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

const HomePage = React.lazy(() => import("pages/HomePage"));
const CategoryPage = React.lazy(() => import("pages/CategoryPage"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailsPage"));
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));
const UserAddNew = React.lazy(() => import("module/user/UserAddNew"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const PostAddNew = React.lazy(() => import("module/post/PostAddNew"));
const PostManage = React.lazy(() => import("module/post/PostManage"));
const PostUpdate = React.lazy(() => import("module/post/PostUpdate"));
const CategoryAddNew = React.lazy(() =>
  import("module/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("module/category/CategoryManage")
);
const CategoryUpdate = React.lazy(() =>
  import("module/category/CategoryUpdate")
);
const DashboardLayout = React.lazy(() =>
  import("module/dashboard/DashboardLayout")
);
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));

function App() {
  return (
    <div>
      <AuthProvider>

      </AuthProvider>
    </div>
  );
}

export default App;
