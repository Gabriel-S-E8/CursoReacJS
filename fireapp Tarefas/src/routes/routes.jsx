import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/home';
import Register from '../pages/register/register';
import Admin from '../pages/admin/admin';
import PrivateRoute from './private';

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default RoutesApp;
