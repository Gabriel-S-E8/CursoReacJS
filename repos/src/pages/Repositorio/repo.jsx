import React, { useState, useEffect } from 'react';
import { Container, Loading, Owner, BackButton, IssuesList } from './style';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function Repositorio({ match }) {
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRepo() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${nomeRepo}`),
                api.get(`repos/${nomeRepo}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    },
                }),
            ]);
            console.log(issuesData.data, repositorioData.data);
            setRepositorio(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        loadRepo();
    }, [match.params.repositorio]);

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        );
    }

    return (
        <div>
            <Container>
                <BackButton to='/'>
                    <FaArrowLeft color='#000' size={30}/>
                </BackButton>
                <Owner>
                    <img
                        src={repositorio.owner.avatar_url}
                        alt={repositorio.owner.login}
                    />
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>
            </Container>
        </div>
    );
}
