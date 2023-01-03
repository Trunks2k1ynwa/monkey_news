import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";



function App() {
  return (
    <div>
      <AuthProvider>
          <div>
            Love me like you do
          </div>
      </AuthProvider>
    </div>
  );
}

export default App;
