import React, { useState } from 'react';
import './home.css';

import { Link, useNavigate} from 'react-router-dom';

import { auth } from '../../firebaseconnection';
import { signInWithEmailAndPassword } from 'firebase/auth';



export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // navega para admin
                navigate('/admin', {replace: true});
            })
            .catch((error) => {
                if (error.message === "auth/invalid-credential") {
                    alert("Email ou senha inválidos");
                }else{
                    console.log(error);
                }
            })
        } else {
            alert('Preencha os campos');
        }
    };

    return (
        <div className="home-container">
            <h1>Lista de Tarefas</h1>
            <span> Gerencia sua agenda de maneira pratica e facil</span>

            <form className="form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Digite o seu E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            <h3>
                Não possui uma conta?{' '}
                <Link to="/register" className="button-link">
                    Cadastre-se
                </Link>
            </h3>
        </div>
    );
}
