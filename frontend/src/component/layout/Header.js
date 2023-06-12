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
      <Navbar bg="secondary" expand="lg" className="text-light fw-semibold">
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
            <Nav  className=" me-auto text-light fw-semibold">
              {/* Routes */}
              <Nav.Link as={Link} to="/home" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products" className="text-white">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-white">
                About
              </Nav.Link>
            </Nav>

     

            {/* Search, Profile and Cart */}
            <Nav>
              <Nav.Link  as={Link} to="/search"  className="text-white">
                <FontAwesomeIcon icon={faSearch} />
              </Nav.Link>
              <Nav.Link  as={Link} to="/login"  className="text-white">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link  as={Link} to="/cart"  className="text-white">
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
