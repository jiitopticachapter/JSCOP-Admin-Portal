import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavbarComponent() {
  const Navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  //   useEffect(() => {
  //     setUser();
  //   }, []);
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");

    Navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="ms-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/email">
                  Email
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/whatsapp">
                  Whatsapp
                </Nav.Link> */}
              </>
            )}

            <button className="btn btn-danger mx-2" onClick={handleLogOut}>
              Log Out
            </button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
