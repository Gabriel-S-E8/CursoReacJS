import React from "react";

import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/routes";
import AuthProvider from "./Contexts/AuthContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
