import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Card, Col } from "react-bootstrap";



const Product = ({ product }) => {


  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };


  return (
    <Col>
    <Link style={{ textDecoration: "none" }} to={product._id}>
              <Card className="mb-4">
                <Card.Img src={product.images[0].url} alt={product.name} />
                <Card.Body className="">
                  <Card.Title>{product.name}</Card.Title>
                  <ReactStars {...options} />
                  <span>{product.numOfReviews} Reivews</span>
                  <div className="">
                    <p> Price: ${product.price}</p>
                  </div>
                </Card.Body>
              </Card>
    </Link>
    </Col>

  );
};

export default Product;
