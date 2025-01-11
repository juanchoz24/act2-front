import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useForm } from "../hook/useForm";
const URI = "http://localhost:8080/api/registro(v1)/save";



export const CrearApto = () => {
  const [formData, handleChange, resetForm] = useForm({
    torre: "",
    apto: "",
    deposito: "",
    parqueadero: "",
  });

  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
    const parqueaderoInt = parseInt(formData.parqueadero, 10);
    if (isNaN(parqueaderoInt)) {
      swal.fire("Error", "El parqueadero debe ser un número entero válido", "error");
      return;
    }
    try {
      const insertApto = await axios({
        method: "POST",
        url: URI,
        data: {
          torre: formData.torre,
          numApartamento: formData.apto,
          deposito: formData.deposito,
          parqueadero: parqueaderoInt,
        },
      });

      if (insertApto.status === 200) {
        swal
          .fire("El registro se agregó satisfactoriamente", {
            icon: "success",
          })
          .then(() => {
            resetForm(); // Resetear el formulario después del guardado exitoso
            navigate("/apto/");
          });
      } else {
        swal.fire(
          "Error",
          insertApto.data.errors[0].type + " " + insertApto.data.errors[0].message,
          "error"
        );
      }
    } catch (error) {
      let errorMessage = "Ocurrió un error inesperado";
      if (error.response && error.response.data && error.response.data.errors) {
        errorMessage = error.response.data.errors[0].message;
      }
      swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <div>
      <br />
      <div className="container col-5">
        <h3>Crear Apartamento</h3>
        <form onSubmit={Save}>
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
              name="apto"
              value={formData.apto}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Deposito</label>
            <input
              name="deposito"
              value={formData.deposito}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Parqueadero</label>
            <input
              name="parqueadero"
              value={formData.parqueadero}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
            Resetear
          </button>
        </form>
        <div style={{ backgroundColor: "white", height: "400px", marginTop: "20px" }}></div>
      </div>
    </div>
  );
};

export default CrearApto;