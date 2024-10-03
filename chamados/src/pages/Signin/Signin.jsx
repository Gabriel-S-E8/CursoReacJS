import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../db/firebaseConnection";
import { AuthContext } from "../../Contexts/AuthContext";

import "./signin.css";
import logo from "../../assets/logo.png";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email !== "" && password !== "") {
      signIn(email, password);
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema de cadastros" />
        </div>

        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Acessar</button>
        </form>

        <h3>Não possui conta? <Link to="/register">Cadastre-se</Link></h3>

      </div>
    </div>
  );
}
