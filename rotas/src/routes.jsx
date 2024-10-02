import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Sobre from "./pages/sobre/sobre";
import Contato from "./pages/contato/contato";
import Header from "./components/Header/Header";
import Erro from "./pages/Erro/erro";
import Produto from "./pages/Produto/produto";

function Rotas() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/produto/:id" element={<Produto />} />

        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
