import React from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hora: '00:00:00',
      numero: 0,
      botao: 'COMEÇAR'
    }
    this.timer = null
  }

  Começar = () => {

    if (this.timer !== null) {
      clearInterval(this.timer)
      this.timer = null
      this.setState({botao: 'COMEÇAR'})
    }else{
      this.timer = setInterval(() => {
        let state = this.state
        state.numero += 0.1
        this.setState(state);
      }, 100);
      this.setState({botao: 'PAUSAR'})
    }
  }

  Limpar = () => {
    if (this.timer !== null) { 
      clearInterval(this.timer)
      this.timer = null 
    }

    this.state.numero = 0
    this.state.botao = "COMEÇAR"
    this.setState(this.state)
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({
        hora: new Date().toLocaleTimeString()
      })
    }, 1000)
  }

  render() {
    return (
      <div className="container">
        <img src={require('./assets/cronometro.png')} className="img"/>
        <h1 className="hora">{this.state.hora}</h1>
        <a className="timer">{this.state.numero.toFixed(1)}</a>
        <div className="areaBtn">
          <a className="botao" onClick={this.Começar}>{this.state.botao}</a>
          <a className="botao" onClick={this.Limpar}>LIMPAR</a>
        </div>
      </div>
    );
  }
}
export default App
