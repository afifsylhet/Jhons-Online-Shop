import React from "react";
import logo from "../../images/logo.png";
import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          {/* Company Logo */}
          <Navbar.Brand>
          <img
            src={logo}
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
          </Navbar.Brand>

          {/* Navbar Toggler */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar Collapsible Content */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Routes */}
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/product">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>

     

            {/* Search, Profile and Cart */}
            <Nav>
              <Nav.Link  as={Link} to="/search">
                <FontAwesomeIcon icon={faSearch} />
              </Nav.Link>
              <Nav.Link  as={Link} to="/user">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link  as={Link} to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
