import DashboardLayout from "module/dashboard/DashBoardLayout";
import PostAddNew from "module/post/PostAddNew";
import HomePage from "pages/HomePage";
import PageNotFound from "pages/PageNotFound";
import SignInPage from "pages/SignInPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/dashboard" element={<DashboardLayout></DashboardLayout>}>
            <Route path="/dashboard/add-new-post" element={<PostAddNew></PostAddNew>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
