
import { useContext } from 'react';

import { UserContext } from '../../contexts/userContext'

function Nome() {
  const { alunos, setAlunos } = useContext(UserContext);

  return (
    <div>
      <span style={{ color: '#FF0000' }} >Bem vindo: {alunos} </span>
      <br/>
      <button onClick={ () => setAlunos('Lucas Silva') } >Troca Nome</button>
    </div>
  );
}

export default Nome;
