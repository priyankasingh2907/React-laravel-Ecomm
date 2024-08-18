import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  useEffect(
   () => {
      localStorage.getItem('user-info') ? navigate('/') :''
    }
    
    ,[]);


  const [inputs, setInputs] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    // alert(inputs);
    let result = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(inputs),
    });
    if (result.ok) {
      const data = await result.json();
      console.log(data);
      // localStorage.setItem("user-info", JSON.stringify(data));
      navigate("/login");
      // alert("Registration successful!");
      setInputs("");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10 m-5 border-0 shadow p-5">
            <h1 className="text-center">Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group m-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="email" className="form-label">
                  Username
                </label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="cpassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={inputs.password_confirmation || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="cpassword"
                  placeholder="confirm password"
                />
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
