import React from "react";
import { Link } from 'react-router-dom'
import "./styles/w3.css"

export const Home = () => {
    return (
        <div className="w3-container w3-blue">
          <br></br>
      <h1 className="w3-center">Bienvenido a la Aplicación, Escoja la opción</h1>
      <br></br>
      <div style={{ backgroundColor: 'white', height: '700px', marginTop: '20px' }}></div>
    </div>
    );
}