import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info") == null) {
      navigate("/login");
      return;
    }
  }, []);

  const [name , setName]=useState("");
  const [price , setPrice]=useState("");
  const [description , setDescription]=useState("");
  const [file , setFile]=useState("");

  const handleSubmit = async () => {
    event.preventDefault();
    console.warn (name,price,file,description);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("file", file);

    let result = await fetch("http://127.0.0.1:8000/api/storeProduct",{
      method: 'POST',
      body: formData,
    });
    
    navigate("/");
    window.location.reload();
    alert('submited');
    console.log(result);
   
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10 m-5 border-0 shadow ">
          <div className="d-flex justify-content-between">
    <div className="div">
    <h2>Register New Product</h2>
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
                  name="name"
                  value={name || ""}
                  onChange={(e)=>setName(e.target.value)}
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
                  name="price"
                  value={price || ""}
                  onChange={(e)=>setPrice(e.target.value)}
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
                 
                  onChange={(e)=>setFile(e.target.files[0])}
                  className="form-control"
                  id="file"
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  value={description || ""}
                  onChange={(e)=>setDescription(e.target.value)}
                  className="form-control"
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark m-3">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
