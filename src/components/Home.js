import React from "react";
import bienvenido from './imagenes/bienvenido.jpg';
import "./styles/w3.css"


const obtenerFechaHoraActual = () => {
  const currentDate = new Date();
  const datetime =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " - " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes().toString().padStart(2, "0") +
    ":" +
    currentDate.getSeconds().toString().padStart(2, "0");
  return datetime;
};

export const Home = () => {
  return (
    <div className="w3-container w3-blue" style={{ minHeight: "100vh" }}>
      <br />
      <h1 className="w3-center">Bienvenido a la Aplicación</h1>
      <br />
      <h2 className="w3-center">{obtenerFechaHoraActual()}</h2>
      <div
        className="w3-card-4 w3-white w3-round-large w3-padding"
        style={{
          margin: "20px auto",
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        <h2 className="w3-text-blue">Sobre Nuestro Sitio</h2>
        <p className="w3-text-gray w3-large">
          Bienvenido a nuestra plataforma, donde encontrarás las mejores
          herramientas para gestionar tus necesidades de manera eficiente y
          sencilla. Exploramos soluciones innovadoras para hacer tu vida más
          fácil.
        </p>
        <p className="w3-text-gray">
          ¡Nos encantaría que explores nuestras funcionalidades! Si necesitas
          ayuda, no dudes en contactarnos.
        </p>

        {/* Imagen decorativa */}
        <img
          src={bienvenido}  
          alt="Bienvenido"
          className="w3-image w3-round-large"
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};