import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      
    }else{
        alert('Preencha todos os campos');
    }
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema de cadastros" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Digite seu Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>

        <h3>
          ja possui uma conta? <Link to="/">Faça Login</Link>
        </h3>
      </div>
    </div>
  );
}
