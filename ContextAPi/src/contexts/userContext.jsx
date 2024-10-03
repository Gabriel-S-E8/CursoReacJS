
import { useState, createContext } from 'react';


export const UserContext = createContext({});

function UserProvider({children}){
  const [alunos, setAlunos] = useState('Sujeito Programador');
  const [qtdAlunos, setQtdAlunos] = useState(10);

  return(
    <UserContext.Provider value={{ alunos, setAlunos, qtdAlunos, setQtdAlunos}}>
      {children}
    </UserContext.Provider>
  )
}



export default UserProvider;