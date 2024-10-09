import React, { useState, useEffect } from 'react';
import {
    Container,
    Loading,
    Owner,
    BackButton,
    IssuesList,
    PageActions,
    FilterList,
} from './style';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function Repositorio({ match }) {
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

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

    useEffect(() => {
        async function loadIssues() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const response = await api.get(`repos/${nomeRepo}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                    page,
                },
            });

            setIssues(response.data);
        }

        loadIssues();
    }, [match.params.repositorio, page]);

    function handlePage(action) {
        setPage(action === 'back' ? page - 1 : page + 1);
    }

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
                <BackButton to="/">
                    <FaArrowLeft color="#000" size={30} />
                </BackButton>
                <Owner>
                    <img
                        src={repositorio.owner.avatar_url}
                        alt={repositorio.owner.login}
                    />
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>

                <FilterList>
                    
                </FilterList>

                <IssuesList>
                    {issues.map((issue) => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map((label) => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>

                <PageActions>
                    <button type="button" onClick={() => handlePage('back')} disabled={page < 2}>
                        Voltar
                    </button>
                    <button type="button" onClick={() => handlePage('next')}>
                        Proxima
                    </button>
                </PageActions>
            </Container>
        </div>
    );
}
