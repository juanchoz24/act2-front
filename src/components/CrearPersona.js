import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useForm } from "../hook/useForm";
const URI = "http://localhost:8080/api/persona(v1)/save";



export const CrearPersona = () => {
  
  const [formData, handleChange, resetForm] = useForm({
    documento: "",
    tipoDocIDen: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    email:"",
    torre:"",
    apartamento:"",
  });

  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
  const fechaNacimientoInt = parseInt(formData.fechaNacimiento, 10);
  if (isNaN(fechaNacimientoInt)) {
    swal.fire("Error", "La fecha de nacimiento debe ser un número entero válido", "error");
    return;
  }
  const apartamentoInt = parseInt(formData.apartamento, 10);
  if (isNaN(apartamentoInt)) {
    swal.fire("Error", "El apartamento debe ser un número entero válido", "error");
    return;
  }
    try {
      const insertPersona = await axios({
        method: "POST", 
        url: URI,
        data: {
            documento: formData.documento,
            tipoDocIDen: formData.tipoDocIDen,  
            nombres: formData.nombres,
            apellidos: formData.apellidos,
            fechaNacimiento: fechaNacimientoInt,
            email: formData.email,
            torre:formData.torre,
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
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            type="text"
            className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo Documento</label>
            <input
              name="tipoDocIDen"
              value={formData.tipoDocIDen}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <input
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de nacimiento</label>
            <input
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Torre</label>
            <input
               name="torre"
               value={formData.torre}
               onChange={handleChange}
               type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apartamento</label>
            <input
               name="apartamento"
               value={formData.apartamento}
               onChange={handleChange}
               type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">

          
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
            Resetear
          </button>
        </form>
        <div style={{ backgroundColor: 'white', height: '400px', marginTop: '20px' }}></div>
      </div>
    </div>
  );
};

export default CrearPersona;
