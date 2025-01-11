import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
const URI = 'http://localhost:8080/api/persona(v1)/buscartodos'

export const ConsultaPersona = (props) => {

  let headers = props.headers
  const navigate = useNavigate();
  const [Persona, setPersona] = useState([]);
  useEffect(() => {
  getPersona()
  }, []);


  const getPersona = async () => {
    try {
      const res = await axios.get(URI);
      setPersona(res.data)
    } catch (error) {
      navigate("/noFound")
    }
  }

  const deleteProducts = async (item) => { 
        console.log(item);
        const result = await  swal.fire({
            title: '¿Estas seguro que deseas borrar este registro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        })
        
        if (result.isConfirmed) {
              try {
                // Using template literals to build the URL and passing the id
                const response = await axios.delete(`http://localhost:8080/api/persona(v1)/borrar/{item}`);
                console.log(response);
                if (response.status === 204)
                {
                    swal.fire({
                        title: 'Borrado!',
                        text: 'El registro se ha borrado con exito',
                        icon: 'success',
                        confirmButtonText:'Ok'
                    })
                 
                }

              }catch(error)
              {
                console.error('Error deleting item',error)
                swal.fire({
                  title:'Error!',
                  text: 'Ocurrio un error al borrar el registro',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
              }

        }
    }

    return (
        <div>
          {" "}
    
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <Link to="/CrearPersona" className='btn btn-outline-primary mt-2 mb-2'><i className="fa fa-plus"></i></Link>  Crear persona
                <table className='table'>
                  <thead className='table-primary'>
                    <tr>
                      <th>Documento</th>
                      <th>Tipo Documento</th>
                      <th>Nombres</th>
                      <th>Apellidos</th>
                      <th>Fecha de nacimiento</th>
                      <th>Correo Electrónico</th>
                      <th>Apartamento</th>
                    </tr>
                  </thead>
                  <tbody>
    
                    {Persona.map((Persona) => (
                      <tr key={Persona.id}>
                        <td> {Persona.documento} </td>
                        <td> {Persona.tipoDocIDen} </td>
                        <td> {Persona.nombres} </td>
                        <td> {Persona.apellidos} </td>
                        <td> {Persona.fechaNacimiento} </td>
                        <td> {Persona.email} </td>
                        <td> {Persona.apartamento} </td>
                        
                        <td>
                          <Link to={`/EditarPersona/${Persona.id}`} className='btn btn-outline-info'><i className="fa fa-edit"></i></Link>&nbsp;
                          {Persona.documento !== sessionStorage.getItem("user") ? (
                            <button onClick={() => deleteProducts(Persona.id)} className='btn btn-outline-danger'><i className="fa fa-trash"></i></button>) : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', height: '10px', marginTop: '20px' }}></div>
        </div>
      );
}
