import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/My.css";

function NavBar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="">
            MovieMania
          </Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/recommendation">
              Recommendation
            </Nav.Link>
            <Nav.Link as={Link} to="/trending">
              Trending
            </Nav.Link>
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/tvseries">
              TvSeries
            </Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
