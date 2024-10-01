import React, { Component } from 'react';
import styles from './app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textoFrase: ''
        };

        
        this.frases = ['Siga os bons e aprenda com eles.', 'O bom-senso vale mais do que muito conhecimento.', 
            'O riso é a menor distância entre duas pessoas.', 
            'Deixe de lado as preocupações e seja feliz.',
            'Realize o óbvio, pense no improvável e conquiste o impossível.',
            'Acredite em milagres, mas não dependa deles.',
            'A maior barreira para o sucesso é o medo do fracasso.'];
    }

    quebrarBiscoito = () => {
        let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
        this.setState({
            textoFrase: '"' + this.frases[numeroAleatorio] + '"'
        });
    }

    render() {
        return (
            <div className='container'>
                <img src={require('./assets/biscoito.png')} className='img'/>
                <Botao nome='Abrir biscoito' acaoBtn={this.quebrarBiscoito}/>
                <h3 className='textoFrase'>{this.state.textoFrase}</h3>
            </div>
        );
    }
}

class Botao extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.acaoBtn}>{this.props.nome}</button>
            </div>
        );
    }
}

export default App;
