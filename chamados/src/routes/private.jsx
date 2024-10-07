import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { signed, load} = useContext(AuthContext);

  if (load) {
    return <div>Carregando...</div>;
  }

  if (!signed) {

    return <Navigate to="/" />;
  }

  return children;
}
