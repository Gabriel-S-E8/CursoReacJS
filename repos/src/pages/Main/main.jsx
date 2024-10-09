import React, { useState, useCallback, useEffect } from 'react';
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';

import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Buscar
    useEffect(() => {
        const repositories = localStorage.getItem('repos');
        if (repositories) {
            setRepositorios(JSON.parse(repositories));
        }
    }, []);

    // Salvar alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            async function submit() {
                setLoading(true);

                setError(null);
                try {

                    if (newRepo === '') {
                        throw new Error('Você precisa informar um repositório');
                    }

                    const response = await api.get(`repos/${newRepo}`);

                    const hasRepo = repositorios.find((r) => r.name === newRepo);

                    if (hasRepo) {
                        throw new Error('Repositório duplicado');
                    }

                    const data = {
                        name: response.data.full_name,
                    };

                    setRepositorios([...repositorios, data]);
                    setNewRepo('');
                } catch (error) {
                    setError(true);
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }

            submit();
        },
        [newRepo, repositorios],
    );

    function handleinputChange(e) {
        setNewRepo(e.target.value);
        setError(null);
    }

    const handleDelete = useCallback((repo)=> {
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    }, [repositorios]);

    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Repositorios
            </h1>

            <Form onSubmit={handleSubmit} error = {error}>
                <input
                    type="text"
                    placeholder="Adicionar Repositorios"
                    value={newRepo}
                    onChange={handleinputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map((repo) => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton
                                onClick={() => handleDelete(repo.name)}
                            >
                                <FaTrash size={14} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
}
