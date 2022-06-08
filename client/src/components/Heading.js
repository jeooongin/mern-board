import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const Heading = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              Home
            </Link>

            <Link
              to="/upload"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              Upload
            </Link>

            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              List
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Heading;
