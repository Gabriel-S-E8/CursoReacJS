import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../db/firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    function loadUser() {
      const storageUser = localStorage.getItem("@User");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoad(false);
      }

      setLoad(false);
    }
    loadUser();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().name,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        storageUser(data);
        setLoading(false);
        toast.dark(`Bem vindo ${data.nome} 🚀`, { autoClose: 5000 });
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Usuário ou senha inválidos! 😲");
      });
  };

  const signUp = async (email, password, name) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          name: name,
          avatarUrl: null,
        })
          .then(() => {
            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              avatarUrl: null,
            };

            setUser(data);
            storageUser(data);
            alert("Cadastrado com sucesso!");
            setLoading(false);
            toast.success("Cadastrado com sucesso!");
            toast.dark(`Bem vindo ${name} 🚀`, { autoClose: 5000 });
            navigate("/dashboard", {replace: true});
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Algo deu errado! 😲");
      });
  };

  const storageUser = (data) => {
    localStorage.setItem("@User", JSON.stringify(data));
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("@User");
    setUser(null);
    toast.success("Deslogado com sucesso! 🚨");
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loading,
        load,
        logout,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
