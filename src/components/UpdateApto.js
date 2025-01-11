import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from "sweetalert"
const URI = 'https://8080-old-forest-22658171.in-ws1.runcode.io/api/products'

const UpdateProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const { id } = useParams()
  
  const navigate = useNavigate();

  const Save = async () => {
    event.preventDefault();
    try {
      const updateProduct = await axios({
        method: "POST",
        url: URI,
        data: {
          id:id,
          productName: productName,
          productDescription: productDescription,
          unitPrice: unitPrice
        }
       
      });
      console.log(updateProduct.status);
      
      if (updateProduct.status === 201) {
        swal("El registro se modificó satisfactoriamente", {
          icon: "success",
        }).then((value) => {
          navigate("/");
        });
      } else {
        swal("Error", updateProduct.data.errors[0].type + " " + updateProduct.data.errors[0].message, "error")
      }

    } catch (error) {
      //console.log(error);
      swal("Error", JSON.parse(error.request.response).errors[0].message, "error")
    }
  }

  useEffect(() => {
    getUserById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserById = async () => {
    console.log("bien");
    

    const res = await axios({
      method: "GET",
      url: URI +"/"+ id,
    });
    console.log(res);
    
    setProductName(res.data.productName)
    setProductDescription(res.data.productDescription)
    setUnitPrice(res.data.unitPrice)
  }
  return (
    <div>
      <div className="container col-5">
        <h3>Actualizar Producto</h3>
        <form onSubmit={Save}>
        <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>
        </form>
      </div></div>
  );
}

export default UpdateProduct;