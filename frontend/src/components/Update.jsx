import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    file: "",
  });
  let { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setFile] = useState("");

  console.log(id);
  useEffect(() => {
    if (localStorage.getItem("user-info") == null) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/show/${id}`);
        const jsonData = await response.json();
        console.log("Data fetched successfully:", jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.warn(name, price, image, description);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("file", image);

    let result = await fetch(`http://127.0.0.1:8000/api/update/${id}`, {
      method: "post",
      body: formData,
    });
    alert("submited");
    console.log(result);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10 m-5 border-0 shadow ">
           
            <div className="d-flex justify-content-between gap-5">
    <div className="div">
    <h2>Edit Product</h2>
    </div>
    <div>
<Link to="/" className="btn btn-dark">Back</Link>
    </div>
   </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group m-3">
                <label htmlFor="username" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  name="dataname"
                  defaultValue={data.name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="price" className="form-label">
                  Product price
                </label>
                <input
                  type="number"
                  name="dataprice"
                  defaultValue={data.price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  id="price"
                  placeholder="Enter price"
                />
              </div>
            
              <div className="form-group m-3">
                <label htmlFor="file" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="form-control"
                  id="file"
                />
                 <img
                  src={`http://127.0.0.1:8000/${data.file}`}
                  alt=""
                  width="100px"
                  className="mt-2"
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  defaultValue={data.description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  name="datadescription"
                  id="description"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark m-3">
            Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
