import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseconnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true });
                })
                .catch((error) => {
                    console.log('Erro ao cadastrar' + error);
                })
        } else {
            alert('Preencha os campos');
        }
    };

    return (
        <div className="home-container">
            <h1>Cadastra-se</h1>
            <span> Crie sua conta </span>

            <form className="form" onSubmit={handleRegister}>
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

                <button type="submit">Cadastrar</button>
            </form>

            <h3>
                Ja tem uma conta?{' '}
                <Link to="/" className="button-link">
                    Faça o Login
                </Link>
            </h3>
        </div>
    );
}
