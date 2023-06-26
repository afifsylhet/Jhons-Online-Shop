import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <Container  className="overflow-x-auto">
          <br />
          <br />
          <p className="fs-2 fw-semibold text-center">No Product in the cart</p>
          <div className="d-flex justify-content-center">
            <Link
              to="/products"
              className="btn btn-secondary w-50  text-center"
            >
              {" "}
              Browse Product
            </Link>
          </div>
          <br />
          <br />
        </Container>
      ) : (
        <Container>
          <br />
          <br />
          <Row className="p-2 bg-warning">
            <Col className="col-6 col-lg-8">
              <p>Product</p>
            </Col>
            <Col className="col-4 col-lg-2 text-center">
              <p>Quantity</p>
            </Col>
            <Col className="col-2 col-lg-2 text-center">
              <p>Sub Total</p>
            </Col>
          </Row>
          <div>
            {cartItems.map((item) => (
              <CartItems key={item.product} item={item} />
            ))}
          </div>
          <Row>
            <Col className="col-12 col-lg-6"></Col>
            <Col className=" col-12 col-lg-6 d-flex justify-content-between fs-4 fw-semibold text-success">
              <p>Grand Total : </p>
              <p>
                ${" "}
                {cartItems.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0
                )}{" "}
              </p>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              className="m-3 text-center px-4 btn btn-secondary w-50"
              onClick={checkOutHandler}
            >
              Check Out
            </Button>
          </div>
        </Container>
      )}
      <br />
      <br />
    </>
  );
};

export default Cart;
