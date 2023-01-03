import HomePage from "pages/HomePage";
import NoFoundPage from "pages/NoFoundPage";
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
          <Route path="*" element={<NoFoundPage></NoFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
