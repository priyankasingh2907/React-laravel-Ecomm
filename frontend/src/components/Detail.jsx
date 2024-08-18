import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



export default function Detail() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [file , setFile]=useState("");
 console.log(id);

  useEffect(() => {
    if (localStorage.getItem("user-info") == null) {
      navigate("/login");
      window.location.reload();
      return;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
    const formData = new FormData();
    formData.append("file", file);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/show/${id}`);
        const jsonData = await response.json();
        setData(jsonData);
        setFile(jsonData.file)
        console.log("Data fetched successfully:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[]);
  return (
    <>
    <div className="container m-5 ">
      <div className="row ">
        <div className="col-md-6 ">
          <img src={`http://127.0.0.1:8000/${file}`} width="400px" alt={data.title} />
        </div>
        <div className="col-md-6">

          <div className=" text-center  ">
         <div className="m-5"> <h1>{data.name}</h1></div>
          <div className="mb-5"><h3>${data.price}</h3></div>
         
          <div className="mt-5">
          <p>{data.description}</p>

          </div>
          <div>
<Link to="/" className="btn btn-dark">Add to Cart</Link>
    </div>
          </div>
        </div>
      </div>
     
  
   </div>
   
  
   
    
    
    </>
  )
}
