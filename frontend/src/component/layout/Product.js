import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Card, Col } from "react-bootstrap";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  size: window.innerWidth < 600 ? 20 : 25,
  value: 2.5,
  isHalf: true,
};

const Product = ({ product }) => {
  return (
    <Col>
    <Link style={{ textDecoration: "none" }} to={product._id}>
              <Card className="mb-4">
                <Card.Img src={product.img[0]} alt={product.name} />
                <Card.Body className="">
                  <Card.Title>{product.name}</Card.Title>
                  <ReactStars {...options} />
                  <span>256 Reivews</span>
                  <div className="">
                    <p>{product.price}</p>
                  </div>
                </Card.Body>
              </Card>
    </Link>
    </Col>

  );
};

export default Product;
