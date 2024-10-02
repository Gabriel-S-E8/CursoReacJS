import React, { useState, useEffect } from 'react';
import { db } from './firebaseconnection';
import { auth } from './firebaseconnection';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    doc,
    //setDoc,
    collection,
    addDoc,
    //getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    onSnapshot,
} from 'firebase/firestore';
import './app.css';

function App() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [idpost, setIdPost] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
                let listaPost = [];

                snapshot.forEach((doc) => {
                    listaPost.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        autor: doc.data().autor,
                    });
                });
                setPosts(listaPost);
            });
        };

        loadPosts();
    }, []);

    useEffect(() => {
        const checkLogin = async () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {

                    console.log(user);
                    setUser(true);
                    setUserDetails({
                        uid: user.uid,
                        email: user.email,
                    });
                } else {
                    setUser(false);
                    setUserDetails({});
                }
            });
        }

        checkLogin();
    }, []);

    const handleAdd = async () => {
        // caso eu queira especificar o id a ser criado
        // ou ate mesmo a ser atualizado pode ser utilizado o setDoc
        // await setDoc(doc(db, 'posts', '12345'), {
        //     titulo: titulo,
        //     autor: autor,
        // })
        //     .then(() => {
        //         alert('Cadastrado com sucesso!');
        //         console.log('Cadastrado com sucesso!');
        //         setAutor('');
        //         setTitulo('');
        //     })
        //     .catch((error) => {
        //         console.log("Erro ao cadastrar" + error);
        //     });

        // caso voce queira que o id seja gerado pelo firebase use dessa maneira
        await addDoc(collection(db, 'posts'), {
            titulo: titulo,
            autor: autor,
        })
            .then(() => {
                alert('Cadastrado com sucesso!');
                console.log('Cadastrado com sucesso!');
                setAutor('');
                setTitulo('');
            })
            .catch((error) => {
                console.log('Erro ao cadastrar' + error);
            });
    };

    const buscarPost = async () => {
        // caso eu queira buscar um post especifico
        // const docRef = doc(db, 'posts', '12345');
        // await getDoc(docRef)
        // .then((docSnap) => {
        //     console.log("Document data:", docSnap.data());
        //     setAutor(docSnap.data().autor);
        //     setTitulo(docSnap.data().titulo);
        // })
        // .catch((error) => {
        //     console.log("Erro ao buscar" + error);
        // });

        // caso eu queira buscar todos os posts ou mais de 1 uso o getDocs
        const postsRef = collection(db, 'posts');
        await getDocs(postsRef)
            .then((querySnapshot) => {
                let lista = [];
                querySnapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        autor: doc.data().autor,
                    });
                });
                setPosts(lista);
                console.log('Document data:', lista);
            })
            .catch((error) => {
                console.log('Erro ao buscar' + error);
            });
    };

    const editarPost = async () => {
        const docRef = doc(db, 'posts', idpost);
        await updateDoc(docRef, {
            titulo: titulo,
            autor: autor,
        })
            .then(() => {
                alert('Post atualizado com sucesso!');
                console.log('Post atualizado com sucesso!');
                setIdPost('');
                setAutor('');
                setTitulo('');
            })
            .catch((error) => {
                console.log('Erro ao atualizar' + error);
            });
    };

    const excluirPost = async (id) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef)
            .then(() => {
                alert('Post excluido com sucesso!');
                console.log('Post excluido com sucesso!');
            })
            .catch((error) => {
                console.log('Erro ao excluir' + error);
            });
    };

    const novoUsuario = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Cadastrado com sucesso!');
                console.log('Cadastrado com sucesso!');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.log('Erro ao cadastrar' + error);
            });
    };

    const logarUser = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                alert('Logado com sucesso!');
                console.log('Logado com sucesso!');
                console.log(value);

                setUserDetails({
                    uid: value.user.uid,
                    email: value.user.email,
                });
                setUser(true);

                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.log('Erro ao logar' + error);
            });
    };

    const Logout = async () => {
        await signOut(auth);
        setUser(false);
        setUserDetails({});
    };

    return (
        <div className="App">
            <h1>ReactJs + Firebase</h1>

            {user && (
                <div>
                    <strong>Seja Bem-Vindo(a) (Você está logado)</strong>
                    <br />
                    <span>
                        ID: {userDetails.uid} - Email: {userDetails.email}
                    </span>
                    <br />
                    <button onClick={Logout}>Sair</button>
                    <br />
                    <br />
                </div>
            )}

            <div className="container">
                <h2>Usuarios</h2>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />{' '}
                <br />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />{' '}
                <br />
                <button onClick={novoUsuario}>Cadastrar</button>
                <button onClick={logarUser}>Fazer Login</button>
            </div>

            <br />

            <hr />

            <div className="container">
                <label>Id do Post: </label>
                <input
                    type="text"
                    placeholder="Digite o id do post"
                    value={idpost}
                    onChange={(e) => setIdPost(e.target.value)}
                />{' '}
                <br />
                <label>Titulo</label>
                <textarea
                    type="text"
                    placeholder="Digite o titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                ></textarea>
                <label>Autor</label>
                <input
                    type="text"
                    placeholder="Digite o autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <button type="submit" onClick={handleAdd}>
                    Cadastrar
                </button>
                <button type="submit" onClick={buscarPost}>
                    Buscar Post
                </button>{' '}
                <br />
                <button onClick={editarPost}>Atualizar post</button>
                <ul>
                    {posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <strong>ID: {post.id}</strong> <br />
                                <span>Titulo: {post.titulo} </span>
                                <br />
                                <span>Autor: {post.autor}</span>
                                <br />
                                <button onClick={() => excluirPost(post.id)}>
                                    {' '}
                                    Excluir Post
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
