import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import Show from "./Show";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div>
    <GlobalStyles/>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<Show></Show>}>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
