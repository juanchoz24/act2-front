import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
const URI = "http://localhost:8080/api/persona(v1)/save";



export const CrearPersona = () => {
  const [documento, setDocumento] = useState("");
  const [tipoDocIDen, setTipoDocumento] = useState("");
  const [nombres, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFecha] = useState("");
  const [email, setEmail] = useState("");
  const [torre, setTorre] = useState("");
  const [apartamento, setApartamento] = useState("");

  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
  const fechaNacimientoInt = parseInt(fechaNacimiento, 10);
  if (isNaN(fechaNacimientoInt)) {
    swal.fire("Error", "El parqueadero debe ser un número entero válido", "error");
    return;
  }
  const apartamentoInt = parseInt(apartamento, 10);
  if (isNaN(apartamentoInt)) {
    swal.fire("Error", "El parqueadero debe ser un número entero válido", "error");
    return;
  }
    try {
      const insertPersona = await axios({
        method: "POST", 
        url: URI,
        data: {
            documento: documento,
            tipoDocIDen: tipoDocIDen,  
            nombres: nombres,
            apellidos: apellidos,
            fechaNacimiento: fechaNacimientoInt,
            email: email,
            torre:torre,
            apartamento:apartamentoInt 
        },
      });
      console.log(insertPersona.status);
      
      if (insertPersona.status === 200) {
        swal.fire("El registro se agregó satisfactoriamente", {
          icon: "success",
        }).then((value) => {
          navigate("/Persona/");
        });
        
      } else {
        swal.fire(
          "Error",
          insertPersona.data.errors[0].type +
          " " +
          insertPersona.data.errors[0].message,
          "error"
        );
      }
    } catch (error) {
    console.error("Error completo:", error);

    // Verifica si hay respuesta del servidor (error.response)
    let errorMessage = "Ocurrió un error inesperado";
    
    if (error.response && error.response.data && error.response.data.errors) {
      errorMessage = error.response.data.errors[0].message;
    }

    // Muestra el error con SweetAlert
    swal.fire("Error", errorMessage, "error");
      }
  };


  return (
    <div>
      <br/>
      <div className="container col-5">
        <h3>Crear Residente</h3>
        <form onSubmit={Save}>
          <div className="mb-3">
            <label className="form-label">Documento</label>
            <input
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo Documento</label>
            <input
              value={tipoDocIDen}
              onChange={(e) => setTipoDocumento(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <input
              value={nombres}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de nacimiento</label>
            <input
              value={fechaNacimiento}
              onChange={(e) => setFecha(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Torre</label>
            <input
              value={torre}
              onChange={(e) => setTorre(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apartamento</label>
            <input
              value={apartamento}
              onChange={(e) => setApartamento(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">

          
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>
        </form>
        <div style={{ backgroundColor: 'white', height: '400px', marginTop: '20px' }}></div>
      </div>
    </div>
  );
};

export default CrearPersona;
