import { useEffect, useState } from 'react';
import './admin.css';
import { auth, db } from '../../firebaseconnection';
import { signOut } from 'firebase/auth';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';

export default function Admin() {
    const [tarefaInput, setTarefaInput] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});

    const user = auth.currentUser;
    console.log(user);

    useEffect(() => {
        const loadTarefas = async () => {
            const userdetail = localStorage.getItem('@userData');

            console.log(userdetail);
            if (userdetail) {
                const data = JSON.parse(userdetail);

                const tarefaRef = collection(db, 'tarefas');
                const q = query(
                    tarefaRef,
                    orderBy('created', 'desc'),
                    where('userUid', '==', data?.uid),
                );

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        });
                    });

                    console.log(lista);
                    setTarefas(lista);
                });
            }
        };

        loadTarefas();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (tarefaInput !== '') {
            if (user) {
                if (edit?.id) {
                    handleUpdate();
                    return;
                }

                // Verifica se o usuário está autenticado
                await addDoc(collection(db, 'tarefas'), {
                    tarefa: tarefaInput,
                    created: new Date(),
                    userUid: user.uid, // Usa o uid do usuário autenticado
                })
                    .then(() => {
                        setTarefaInput(''); // Limpa o campo após adicionar a tarefa
                        alert('Tarefa adicionada com sucesso!');
                        console.log('Tarefa adicionada com sucesso!');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                alert(
                    'Usuário não autenticado. Por favor, faça login novamente.',
                );
            }
        } else {
            alert('Digite a sua tarefa');
            return;
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    const deleteTarefa = async (id) => {
        const docRef = doc(db, 'tarefas', id);
        await deleteDoc(docRef);
    };

    const editTarefa = async (item) => {
        setTarefaInput(item.tarefa);
        setEdit(item);
    };

    const handleUpdate = async () => {
        const docRef = doc(db, 'tarefas', edit?.id);
        await updateDoc(docRef, {
            tarefa: tarefaInput,
        })
            .then(() => {
                console.log('Tarefa atualizada com sucesso!');
                setTarefaInput('');
                setEdit({});
            })
            .catch((error) => {
                console.log('Erro ao atualizar' + error);
            });
    };

    return (
        <div className="admin-container">
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleRegister} className="form">
                <textarea
                    placeholder="Digite sua tarefa"
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className="btn-register" type="submit">
                        Atualizar Tarefa
                    </button>
                ) : (
                    <button className="btn-register" type="submit">
                        Cadastrar Tarefa
                    </button>
                )}
            </form>

            {tarefas.map((item) => (
                <article key={item.id} className="list">
                    <p>{item.tarefa}</p>
                    <div>
                        <button onClick={() => editTarefa(item)}>Editar</button>
                        <button
                            className="btn-delete"
                            onClick={() => deleteTarefa(item.id)}
                        >
                            Concluir
                        </button>
                    </div>
                </article>
            ))}

            <button className="btn-logout" onClick={handleLogout}>
                Sair
            </button>
        </div>
    );
}
