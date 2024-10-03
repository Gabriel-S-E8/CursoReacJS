import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes/routes';

export default function App(){
    return (
        <BrowserRouter>
            <RoutesApp />
        </BrowserRouter>
    )
}