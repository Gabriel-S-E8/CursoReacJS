
import { useContext } from 'react';

import Nome from '../Nome/nome';

import { UserContext } from '../../contexts/userContext';

function Alunos() {
  const { qtdAlunos, setQtdAlunos } = useContext(UserContext);

  return (
    <div>
      <h2>Quantidade total de alunos: {qtdAlunos} </h2>
      <Nome />
    </div>
  );
}

export default Alunos;
