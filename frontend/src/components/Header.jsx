import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function Header() {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("user-info");
   
    navigate("/login");
    window.location.reload();

  }
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-primary  "
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid className="d-flex justify-content-between p-4">
         <div>
         <Navbar.Brand href="/">React Laravel App</Navbar.Brand>

         </div>
         <div>
         <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {localStorage.getItem("user-info") ? (
              <>
                <Link to="/" className="text-white text-decoration-none m-3">
                  {" "}
                  Home
                </Link>
                <Link to="/add" className="text-white text-decoration-none m-3">
                  {" "}
                  Add Product
                </Link>
                <Link
                  to="/detail/:id"
                  className="text-white text-decoration-none m-3"
                >
                  {" "}
                  Products
                </Link>
                <Link
                  to="/product/:id"
                  className="text-white text-decoration-none m-3"
                >
                  {" "}
                  Update Products
                </Link>
                <Link
                  to="/search"
                  className="text-white text-decoration-none m-3"
                >
                  {" "}
                  Search Products
                </Link>

                <Link
                  to=""
                  onClick={logout}
                  className="text-white text-decoration-none m-3"
                >
                  {" "}
                  Logout
                </Link>
                <Link to="" className="text-white text-decoration-none m-3">
                  {" "}
                  {user.name}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-white text-decoration-none m-3"
                >
                  {" "}
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white text-decoration-none m-3"
                >
                  {" "}
                  Login
                </Link>
              </>
            )}
          </Nav>
         </div>
        </Container>
      </Navbar>
    </>
  );
}
