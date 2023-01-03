import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div>
    <GlobalStyles/>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
