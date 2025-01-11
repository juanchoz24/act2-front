import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from "sweetalert2"
const URI = 'http://localhost:8080/api/registro(v1)/actualizar'

export const EditarApto = (props) => {
  const [torre, setTorre] = useState("");
  const [apto, setApto] = useState("");
  const [deposito, setDeposito] = useState("");
  const [parqueadero, setParqueadero] = useState("");

  const { id } = useParams();
  
  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
    const parqueaderoInt = parseInt(parqueadero, 10);
      if (isNaN(parqueaderoInt)) {
        swal.fire("Error", "El parqueadero debe ser un número entero válido", "error");
        return;
      }
    try {
      const editarApto = await axios({
        method: "PUT",
        url: URI,
        data: {
            id: id,
            torre: torre,
            numApartamento: apto,
            deposito: deposito,
            parqueadero: parqueaderoInt
        }
       
      });
      console.log(editarApto.status);
      
      if (editarApto.status === 200) {
        swal.fire("El registro se modificó satisfactoriamente", {
          icon: "success",
        }).then((value) => {
          navigate("/apto/");
        });
      } else {
        swal.fire("Error", editarApto.data.errors[0].type + " " + editarApto.data.errors[0].message, "error")
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
  }

  useEffect(() => {
    getUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserById = async () => {
    console.log("bien");
    

    const res = await axios({
      method: "GET",
      url: `http://localhost:8080/api/registro(v1)/buscarid/${id}`
    });
    console.log(res);
    
    setTorre(res.data.torre)
    setApto(res.data.numApartamento)
    setDeposito(res.data.deposito)
    setParqueadero(res.data.parqueadero)
  }
  return (
    <div>
         <br/>
      <div className="container col-5">
        <h3>Actualizar Apartamento id: {id}</h3>
        <form onSubmit={Save}>
        <div className="mb-3">
            <label className="form-label">Torre</label>
            <input
              value={torre}
              onChange={(e) => setTorre(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apartamento</label>
            <input
              value={apto}
              onChange={(e) => setApto(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Deposito</label>
            <input
              value={deposito}
              onChange={(e) => setDeposito(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Parqueadero</label>
            <input
              value={parqueadero}
              onChange={(e) => setParqueadero(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>
        </form>
        <div style={{ backgroundColor: 'white', height: '400px', marginTop: '20px' }}></div>
      </div></div>
  );
}

export default EditarApto;