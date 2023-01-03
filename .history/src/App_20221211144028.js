import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import Show from "./Show";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Show></Show>}>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
