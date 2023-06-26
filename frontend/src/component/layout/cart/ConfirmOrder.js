import React from "react";
import { useSelector } from "react-redux";
import Steppers from "./Steppers";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const shippingCost = subTotal > 999 ? 0 : 300;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + shippingCost + tax;

const proccedToPayment =()=>{
  const data ={
    subTotal,
    shippingCost,
    tax, 
    totalPrice
  }
  sessionStorage.setItem('orderInfo', JSON.stringify(data))
  navigate("/process/payment")
}


  return (
    <>
      <Steppers currentStep={1}></Steppers>
      <div className="container">
        <Row>
          <Col className="col-12 col-lg-8">
            <p className="fs-3 fw-semibold">Shipping Details</p>
            <div>
              <div className="pt-2">
                <span className="fw-semibold">Name: </span>
                <span>{user?.name} </span>
              </div>
              <div className="pt-2">
                <span className="fw-semibold">Phone: </span>
                <span>{shippingInfo?.phoneNum} </span>
              </div>
              <div className="py-2">
                <span className="fw-semibold">Address: </span>
                <span>
                  {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`}{" "}
                </span>
              </div>
            </div>
            <br />
            <div>
              <p className="fs-4 fw-semibold"> Your Cart Items :-</p>
              <div className="overflow-x-scroll">
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="d-flex justify-content-between p-2 border-bottom"
                  >
                    <Image
                      src={item.image}
                      className="fluid"
                      style={{ maxWidth: "100px" }}
                      alt={item.name}
                    />
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="fw-semibold m-0 p-0">{item.name}</p>
                    </Link>{" "}
                    <div>
                      <span>
                        {item.price} * {item.quantity} = ${" "}
                        {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col className="col-12 col-lg-4 border-start border-2 border-secondary">
            <p className="fs-4 fw-semibold">Order Summary</p>
            <br />
            <div>
              <div className="pb-3">
                <span className="fw-semibold"> Sub Total : </span>
                <span>$ {subTotal}</span>
              </div>
              <div className="pb-3">
                <span className="fw-semibold"> Shipping Charge : </span>
                <span> $ {shippingCost}</span>
              </div>
              <div className="pb-3">
                <span className="fw-semibold"> GST: </span>
                <span> $ {tax}</span>
              </div>
              <br />
              <div className="pb-3 border-top border-2">
                <span className=" fs-4 fw-semibold"> Grand Total: </span>
                <span> $ {subTotal + tax + shippingCost}</span>
              </div>
            </div>
            <br />
            <Button
            className="btn btn-secondary w-100"
            onClick={proccedToPayment}
            >
              Proced to Payment
            </Button>
          </Col>
        </Row>
      </div>
      <br />
      <br />
    </>
  );
};

export default ConfirmOrder;
