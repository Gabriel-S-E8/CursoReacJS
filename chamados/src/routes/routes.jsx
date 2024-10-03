import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp/SignUp";
import Signin from "../pages/Signin/Signin";
import Dashboard from "../pages/Dashboard/Dashboard";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/register" element={<SignUp />} />
      
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
