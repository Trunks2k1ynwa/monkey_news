import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";



function App() {
  return (
    <div>
      <AuthProvider>

      </AuthProvider>
    </div>
  );
}

export default App;
