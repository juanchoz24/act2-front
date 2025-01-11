import React from 'react';
import { BrowserRouter as Router, Route, useNavigate, Switch, Routes } from 'react-router-dom';
import "./styles/w3.css"
import { ConsultaApto } from './ConsultaApartamento';
import { CrearApto} from './CrearApto';
import { CrearPersona} from './CrearPersona';
import { Home } from './Home';
import EditarApto from './EditarApto';
import { ConsultaPersona } from './ConsultaPersona';
import { EditarPersona } from './EditarPersona';

//const Home = () => <h2>Bienvenido a la página de inicio</h2>;
const About = () => <h2>Acerca de nosotros</h2>;
const Contact = () => <h2>Contáctanos</h2>;

const Titulo = () => {
  const navigate = useNavigate(); 

  return (
    <header className="w3-container w3-blue">
                      <th><button className="w3-button w3-green"onClick={() => navigate('/')}>Inicio</button></th>
                      <th><button className="w3-button w3-green"onClick={() => navigate('/CrearApto/')}>Crear Apartamento</button></th>
                      <th><button className="w3-button w3-green"onClick={() => navigate('/apto/')}>Consultar apartamento</button> </th>
                      <th><button className="w3-button w3-green"onClick={() => navigate('/CrearPersona')}>Crear persona</button> </th>
                      <th><button className="w3-button w3-green"onClick={() => navigate('/Persona')}>Consultar persona</button> </th>
    </header>
  );
};

export const Header = () => (
  <Router>
    <Titulo />
    <Routes>
        <Route exact path ="/" element={<Home/>}/>
        <Route exact path ="/apto/" element={<ConsultaApto/>}/>
        <Route exact path ="/CrearApto/" element={<CrearApto/>}/>
        <Route path ="/EditarApto/:id" element={<EditarApto/>}/>
        <Route exact path ="/Persona/" element={<ConsultaPersona/>}/>
        <Route exact path ="/CrearPersona/" element={<CrearPersona/>}/>
        <Route path ="/EditarPersona/:id" element={<EditarPersona/>}/>
    </Routes>
  </Router>
);
