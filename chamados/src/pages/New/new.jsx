import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { db } from '../../db/firebaseConnection';
import {
    getDocs,
    collection,
    getDoc,
    doc,
    addDoc,
    updateDoc,
} from 'firebase/firestore';


import Header from '../../components/Header/header';
import Title from '../../components/Title/title';

import './new.css';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function New() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
	const navigate = useNavigate();

    const [cliente, setCliente] = useState([]);
    const [loadClientes, setLoadClientes] = useState(true);
    const [selectedClient, setSelectedClient] = useState(0);
    const [idCustomer, setIdCustomer] = useState(false);

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    useEffect(() => {
        async function loadClients() {
            const querySnapshot = await getDocs(collection(db, 'customers'))
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nome: doc.data().nome,
                        });
                    });

                    if (snapshot.docs.size === 0) {
                        setCliente([{ id: 1, nome: 'FREELA' }]);
                        setLoadClientes(false);
                        return;
                    }
                    setLoadClientes(false);
                    setCliente(lista);

                    if (id !== undefined) {
                        loadId(lista);
                    }
                })
                .catch((error) => {
                    console.log('Erro ao carregar clientes' + error);
                    setLoadClientes(false);
                    setCliente([{ id: 1, nome: 'FREESLA' }]);
                });
        }
        loadClients();
    }, [id]);

    async function loadId(lista) {
        const docRef = doc(db, 'chamados', id);
        await getDoc(docRef)
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto);
                setStatus(snapshot.data().status);
                setComplemento(snapshot.data().complemento);

                let index = lista.findIndex(
                    (item) => item.id === snapshot.data().clienteId,
                );

                setSelectedClient(index);
                setIdCustomer(true);
            })
            .catch((error) => {
                console.log('Erro ao carregar o chamado' + error);
                toast.error('Esse id nâo existe! 🚫');
                setIdCustomer(false);
            });
    }

    const handleOptionChange = async (e) => {
        setStatus(e.target.value);
    };

    const handleChange = async (e) => {
        setAssunto(e.target.value);
    };

    const handleChangeClient = async (e) => {
        setSelectedClient(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (idCustomer) {
            // atualizando o chamado
            const docRef = doc(db, 'chamados', id);

            await updateDoc(docRef, {
                cliente: cliente[selectedClient].nome,
                clienteId: cliente[selectedClient].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid,
            })
			.then (() => {
				toast.success('Chamado editado com sucesso! 💸');
				setComplemento('');
				setSelectedClient(0);
				navigate('/dashboard');
			})
			.catch((error) => {
				console.log('Erro ao registrar o chamado' + error);
				toast.error('Erro ao registrar o chamado' + error);
			});

            return;
        }

        //registar o chamado
        await addDoc(collection(db, 'chamados'), {
            created: new Date(),
            cliente: cliente[selectedClient].nome,
            clienteId: cliente[selectedClient].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid,
        })
            .then(() => {
                toast.success('Chamado criado com sucesso! 💸');
                setComplemento('');
                setAssunto('Suporte');
                setStatus('Aberto');
                setSelectedClient(0);
            })
            .catch((error) => {
                console.log('Erro ao registrar o chamado' + error);
                toast.error('Erro ao registrar o chamado' + error);
            });
    };

    return (
        <div>
            <Header />

            <div className="content">
                <Title Title={id ? 'Editar Chamado' : 'Novo Chamado'}>
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label> Clientes </label>
                        {loadClientes ? (
                            <input
                                type="text"
                                disabled={true}
                                value="Carregando..."
                            />
                        ) : (
                            <select
                                value={selectedClient}
                                onChange={handleChangeClient}
                            >
                                {cliente.map((item, index) => {
                                    return (
                                        <option key={index} value={index}>
                                            {item.nome}
                                        </option>
                                    );
                                })}
                            </select>
                        )}

                        <label> Assunto </label>
                        <select value={assunto} onChange={handleChange}>
                            <option value="Suporte">Suporte</option>
                            <option value="Reclamação">Reclamação</option>
                            <option value="Implementação">Implementação</option>
                            <option value="Duvidas">Duvidas</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Elogio">Elogio</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Em Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Em Progresso'}
                            />
                            <span>Em Progresso</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Concluido"
                                onChange={handleOptionChange}
                                checked={status === 'Concluido'}
                            />
                            <span>Concluido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu probolema"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        ></textarea>

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
