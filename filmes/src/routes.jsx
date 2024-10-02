import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Filme from './pages/Filme/filme';
import Header from './components/Header/header';


export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filmes/:id" element={<Filme />} />
            </Routes>
        </BrowserRouter>
    )
}