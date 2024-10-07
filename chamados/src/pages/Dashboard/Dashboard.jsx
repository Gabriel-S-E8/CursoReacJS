import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../../db/firebaseConnection';
import {
    collection,
    getDocs,
    orderBy,
    limit,
    startAfter,
    query,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { format, set } from 'date-fns';
import Modal from '../../components/Modal/modal';

import Header from '../../components/Header/header';
import Title from '../../components/Title/title';

import './dashboard.css';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';

const listRef = collection(db, 'chamados');

export default function Dashboard() {
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [last, setLast] = useState();
    const [loadingMore, setLoadingMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState({});

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        async function loadChamados() {
            const q = query(listRef, orderBy('created', 'desc'), limit(5));

            const querySnapshot = await getDocs(q);
            setChamados([]); // zero o chamados para evitar duplicidade de
            //chamados por causa do restrict mode que executa o use effect 2 vezes

            await updateState(querySnapshot);

            setLoading(false);
        }
        loadChamados();

        return () => {};
    }, []);

    const updateState = async (querySnapshot) => {
        const isColletionEmpty = querySnapshot.size === 0;

        if (!isColletionEmpty) {
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clientId,
                    created: doc.data().created,
                    createdFormated: format(
                        doc.data().created.toDate(),
                        'dd/MM/yyyy HH:mm:ss',
                    ),
                    status: doc.data().status,
                    complemento: doc.data().complemento,
                });
            });
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

            setChamados((chamados) => [...chamados, ...lista]);
            setLast(lastDoc);
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    };

    const toggleModal = (item) => {
        setShowModal(!showModal);
        setDetail(item);
    };

    // eslint-disable-next-line
    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title Title="Tickets">
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className="container dashboard">
                        <span>Buscando Chamados...</span>
                    </div>
                </div>
            </div>
        );
    }

    const loadMore = async () => {
        setLoadingMore(true);

        const q = query(
            listRef,
            orderBy('created', 'desc'),
            startAfter(last),
            limit(5),
        );
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    };

    return (
        <div>
            <Header />

            <div className="content">
                <Title Title="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    {chamados.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nenhum Chamado encontrado</span>
                            <Link to="/new" className="new">
                                <FiPlus color="#fff" size={25} /> Novo Ticket
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/new" className="new">
                                <FiPlus color="#fff" size={25} /> Novo Ticket
                            </Link>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Assunto</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Cadastrado em</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chamados.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente">
                                                    {item.cliente}
                                                </td>
                                                <td data-label="Assunto">
                                                    {item.assunto}
                                                </td>
                                                <td data-label="Status">
                                                    <span
                                                        className="badge"
                                                        style={{
                                                            backgroundColor:
                                                                item.status ===
                                                                'Aberto'
                                                                    ? '#5cb85c'
                                                                    : item.status ===
                                                                      'Concluido'
                                                                    ? '#999'
                                                                    : '#f0ad4e',
                                                        }}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td data-label="Cadastrado">
                                                    {item.createdFormated}
                                                </td>
                                                <td data-label="#">
                                                    <button
                                                        className="action"
                                                        style={{
                                                            background:
                                                                '#3583f6',
                                                        }}
                                                        onClick={() => toggleModal(item)}
                                                    >
                                                        <FiSearch
                                                            color="#fff"
                                                            size={18}
                                                        />
                                                    </button>
                                                    <Link
                                                    to = {`/new/${item.id}`}
                                                        className="action"
                                                        style={{
                                                            background:
                                                                '#f6a935',
                                                        }}
                                                    >
                                                        <FiEdit2
                                                            color="#fff"
                                                            size={18}
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {loadingMore && <h3>Buscando mais chamados...</h3>}
                            {!loadingMore && !isEmpty && (
                                <button onClick={loadMore} className="btn-more">
                                    Buscar Mais
                                </button>
                            )}
                        </>
                    )}
                </>
            </div>
            {showModal && (
                <Modal
                    content={detail}
                    close={() => setShowModal(!showModal)}
                /> 
            )}
        </div>
    );
}
