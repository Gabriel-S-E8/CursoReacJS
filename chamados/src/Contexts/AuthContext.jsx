import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebaseConnection";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    console.log(email, password);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
