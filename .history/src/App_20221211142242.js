import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";



function App() {
  return (
<div>
    <Routes>


    <AuthProvider>
      <h1>ANh nhó em lắm</h1>
    </AuthProvider>
    </Routes>
</div>
  );
}

export default App;
