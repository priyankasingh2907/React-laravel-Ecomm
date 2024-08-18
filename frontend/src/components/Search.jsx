
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Search() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [key , setKey]= useState();

  useEffect(() => {
    if (localStorage.getItem("user-info") == null) {
      navigate("/login");
      return;
    }
  }, []);

 
    const fetchData = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://127.0.0.1:8000/api/search/"+key);
        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data fetched successfully:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
   
 

 


  return <>
  <div className="container mt-5">
    <h2>Products</h2>
    <div className="row">
      <div className="col-lg-4">
        <form onSubmit={fetchData}>
          <div className="form-group">
            <label htmlFor="searchInput">Search</label>
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search by name..."
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        </form>
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
        

            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td><img src={"http://127.0.0.1:8000/"+product.file} alt={product.name} width="80"  height="80"/></td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  
  </>;
}
