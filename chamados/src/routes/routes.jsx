import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp/SignUp";
import Signin from "../pages/Signin/Signin";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./private";
import Profile from "../pages/Profile/profile";
import Customer from "../pages/Customer/Customer";
import New from "../pages/New/new";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/customer"
        element={
          <PrivateRoute>
            <Customer />
          </PrivateRoute>
        }
      />
      <Route path="/new" element={<PrivateRoute> <New/></PrivateRoute>} />
      <Route path="/new/:id" element={<PrivateRoute> <New/></PrivateRoute>} />
    </Routes>
  );
}
