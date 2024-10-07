import { useState } from 'react';
import { db} from '../../db/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';

import Header from '../../components/Header/header';
import Title from '../../components/Title/title';

import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Customer() {
    const [nome, setNome] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [adress, setAdress] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        if (nome !== '' && cnpj !== '' && adress !== '') {
            await addDoc(collection(db, 'customers'), {
                nome: nome,
                cnpj: cnpj,
                adress: adress,
            })
                .then(() => {
                    toast.success('Cliente Cadastrado com sucesso! 💎');
                    setNome('');
                    setCNPJ('');
                    setAdress('');
                })
                .catch((error) => {
                    console.log('Erro ao cadastrar' + error);
                    toast.error('Erro ao cadastrar' + error);
                });
        } else {
            toast.error('Preencha todos os campos 😆');
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title Title="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome Fantasia</label>
                        <input
                            type="text"
                            placeholder="Nome da Empresa"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label>CNPJ</label>
                        <input
                            type="text"
                            placeholder="Digite o CNPJ"
                            value={cnpj}
                            onChange={(e) => setCNPJ(e.target.value)}
                        />

                        <label>Endereço</label>
                        <input
                            type="text"
                            placeholder="Endereço da Empresa"
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                        />

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
