import styles from './home.module.css';
import { Header } from '../../components/header';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { fetchUsers, deleteAddress, fetchUserById } from '../../redux/user/slice';

export function Home() {
    const { user, users, loading } = useSelector((rootReducer) => rootReducer.user);

    const dispatch = useDispatch()

    function handleDeleteAddress() {
        dispatch(deleteAddress())
        alert('Endereço deletado com sucesso!');
    }

    function handleFetchUsers() {
        dispatch(fetchUsers())
    }

    function handleFetchUserById() {
        const userId = 2
        dispatch(fetchUserById(userId))
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.link}>
                        Login
                    </Link>
                    <Link to="/painel" className={styles.link}>
                        Painel
                    </Link>
                    <Link to="/address" className={styles.link}>
                        Meus endereços
                    </Link>
                </nav>

                <main className={styles.content}>
                    <div className={styles.message}>
                        <h1 className={styles.title}>
                            Olá {user ? user.name : 'Visitante'}, bem vindo!
                        </h1>

                        {user && (
                            <p className={styles.subtitle}>{user.email}</p>
                        )}

                        {user && user.adress && (
                            <>
                                <strong className={styles.addressLabel}>
                                    Endereço atual:
                                </strong>
                                <div className={styles.address}>
                                    <p>{user.adress.location}, nº{user.adress.number}</p>

                                    <button onClick={handleDeleteAddress}>
                                        Deletar endereço
                                    </button>
                                </div>
                            </>
                        )}
                        <hr />
                        <br />

                        <h2>Lista de usuarios</h2>
                        <button onClick={handleFetchUsers}>Buscar Usuarios</button>
                        <button onClick={handleFetchUserById}>Buscar usuario</button>
                        <br />

                        {loading && <strong>Carregando...</strong>}
                        {!loading && users.map((user) => (
                            <div key={user.id}>
                                <p>ID: {user.id}</p>
                                <p>Nome:{user.name}</p>
                                <p>E-MAIL: {user.email}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
