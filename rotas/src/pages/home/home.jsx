import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
    return (
        <div>
            <h1>Bem vindo a Home</h1>
            <span>Gabriel </span> <br /> <br />

            <Link to="/sobre">Ir para Sobre</Link> <br />
            <Link to="/contato">Ir para Contato</Link>

            <hr />

            <Link to="/produto/1234">Acessar Produto 1234</Link>
        </div>
    )
}

export default Home