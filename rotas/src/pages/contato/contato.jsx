import { Link } from "react-router-dom";
import React from "react";

function Contato(){

    return (
        <div>
            <h1>Contato</h1>
            <span>Contato da empresa </span> <br /> <br />


            <Link to="/">Ir para Home</Link> 
        </div>
    )
}

export default Contato