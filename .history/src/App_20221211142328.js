import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

function App() {
  return (
    <div>
        <AuthProvider>
      <Routes>
          <h1>ANh nhó em lắm</h1>
      </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
