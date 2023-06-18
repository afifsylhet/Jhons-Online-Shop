import React, { useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import {
  Navbar,
  Container,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [tooltipPlacement, setTooltipPlacement] = useState("left");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setTooltipPlacement("left");
      } else {
        setTooltipPlacement("right");
      }
    };

    // Check initial window size
    if (window.innerWidth < 992) {
      setTooltipPlacement("right");
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

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
            <Nav className=" me-auto text-light fw-semibold">
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
              <Nav.Link as={Link} to="/search" className="text-white">
                <OverlayTrigger
                  placement={tooltipPlacement}
                  overlay={renderTooltip("Search A Product")}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </OverlayTrigger>
              </Nav.Link>

              <Nav.Link as={Link} to="/cart" className="text-white">
                <OverlayTrigger
                  placement={tooltipPlacement}
                  overlay={renderTooltip("Add to Cart")}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </OverlayTrigger>
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-white">
                <OverlayTrigger
                  placement={tooltipPlacement}
                  overlay={renderTooltip("Login/Sign Up")}
                >
                  <FontAwesomeIcon icon={faUser} />
                </OverlayTrigger>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
