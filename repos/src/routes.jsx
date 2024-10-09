import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React from 'react';
import Main from './pages/Main/main';
import Repositorio from './pages/Repositorio/repo';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/repositorio/:repositorio" component={Repositorio} />
            </Switch>
        </BrowserRouter>
    )
}