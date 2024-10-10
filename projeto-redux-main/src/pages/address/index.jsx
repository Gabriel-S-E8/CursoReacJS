import { useState } from 'react';
import styles from './address.module.css';
import { Header } from '../../components/header';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addAdress, deleteAddress } from '../../redux/user/slice';

export function Address() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((rootReducer) => rootReducer.user);

    const [addressName, setAddressName] = useState(
        user?.adress?.location ?? '',
    );
    const [addressNumber, setAddressNumber] = useState(
        user?.adress?.number ?? '',
    );

    function handleRegisterAddress() {
        dispatch(
            addAdress({
                location: addressName,
                number: addressNumber,
            }),
        );

        navigate('/painel');
    }

    function handleDeleteAddress() {
        dispatch(deleteAddress());
        alert('Endereço deletado com sucesso!');

        navigate('/painel');
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <main className={styles.content}>
                    <div>
                        <Link to="/painel">Voltar para o painel</Link>

                        {user && user?.adress && (
                            <button
                                className={styles.buttondelete}
                                onClick={handleDeleteAddress}
                            >
                                Deletar endereço
                            </button>
                        )}
                    </div>

                    <section className={styles.address}>
                        <h2>Meu endereço:</h2>

                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ex: Rua centro, x"
                            value={addressName}
                            onChange={(e) => setAddressName(e.target.value)}
                        />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Numero"
                            value={addressNumber}
                            onChange={(e) => setAddressNumber(e.target.value)}
                        />

                        <button
                            className={styles.button}
                            onClick={handleRegisterAddress}
                        >
                            Salvar Alteração
                        </button>
                    </section>
                </main>
            </div>
        </>
    );
}
