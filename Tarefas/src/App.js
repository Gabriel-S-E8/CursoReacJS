import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './App.css';

function App() {
    const [tarefas, setTarefas] = useState([]);
    const [input, setInput] = useState('');
    const [hora, setHora] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const tarefasStorage = localStorage.getItem('tarefas');
        console.log('Tarefas do localStorage:', tarefasStorage); // Debug
        if (tarefasStorage) {
            setTarefas(JSON.parse(tarefasStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        console.log('Tarefas salvas no localStorage:', tarefas); // Debug
    }, [tarefas]);


    const handleAdd = useCallback(() => {
        if (input !== '') {
            setTarefas([...tarefas, input]); // Atualização aqui
            setInput(''); // Limpa o input
        } else {
            alert('Adicione uma tarefa');
        }
    }, [input, tarefas])
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const totalTarefas = useMemo(() => tarefas.length, [tarefas])

    return (
        <div className="App">
            <h1>{hora}</h1>
            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>{tarefa}</li>
                ))}
            </ul>
            <br />
            <strong>Você tem {totalTarefas} tarefas!</strong> <br />
            <input
                type="text"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />
            <button type="button" onClick={handleAdd}>
                Adicionar
            </button>
        </div>
    );
}

export default App;
