import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEditCalendar } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail } from "react-icons/bi";

export default function List() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user-info") == null) {
      navigate("/login");
      window.location.reload();
      return;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/show");
        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data fetched successfully:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[]);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setData(data.filter((product) => product.id!== id));
      console.log("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }


  }


  return <>
  <div className="container mt-5">
   <div className="d-flex justify-content-between gap-5">
    <div className="div">
    <h2>Products</h2>
    </div>
    <div>
<Link to="/add" className="btn btn-dark">Add Product</Link>
    </div>
   </div>

    <div className="row">
      <div className="col-lg-8">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><img src={"http://127.0.0.1:8000/"+product.file} alt={product.name} width="80"  height="80"/></td>
                <td>
                <button className="btn btn-secondary m-1" onClick={() => navigate(`/detail/${product.id}`)}><BiDetail />

                </button>
                  <button className="btn btn-secondary m-1" onClick={() => navigate(`/product/${product.id}`)}><MdEditCalendar />
                  </button>
                  <button className="btn btn-dark" onClick={() => {
                    if (window.confirm("Are you sure you want to delete this product?")) {
                      deleteProduct(product.id);
                    }
                  }}><MdDeleteForever />
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  
  </>;
}
