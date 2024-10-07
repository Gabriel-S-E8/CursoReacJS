import React from "react";

import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/routes";
import AuthProvider from "./Contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} theme="dark"/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
