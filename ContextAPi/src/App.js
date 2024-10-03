import { useState } from "react";
import Alunos from "./components/alunos/alunos";

import UserProvider from "./contexts/userContext";

function App() {
  return (
    <UserProvider>
      <div>
        <h1>ESCOLA</h1>
            <hr />
        <Alunos />
      </div>
    </UserProvider>
  );
}

export default App;
