import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductDetailsForCart, removeFromCart } from "../../../featuers/slice/cartSlice";
import { useDispatch } from "react-redux";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQty = (id, quantity, stock) => {
    Number(quantity ++);
    if (quantity >= stock) return;

    dispatch(getProductDetailsForCart({ id, quantity }));
  };

  const decreaseQty = (id, quantity) => {
    Number(quantity--);

    if (quantity <= 0) return;

    dispatch(getProductDetailsForCart({ id, quantity }));
  };

  const removeFromTheCart = (id) =>{
    dispatch(removeFromCart(id))
  }

  return (
    <>
      <div>
        <Row className="p-2 border-3 border-bottom">
          <Col className="col-6 col-lg-8 d-flex container align-items-center">
            <Image
              fluid
              src={item.image}
              alt={item.name}
              style={{ maxHeight: "100px", width:"100%", maxWidth:"100px"}}
            />
            <div className="ps-2 m-0">
              <Link
                to={`/product/${item.product}`}
                style={{ textDecoration: "none" }}
              >
                <p className="fw-semibold m-0 p-0">{item.name}</p>
              </Link>
              <p className=" m-0 p-0">Price: $ {item.price}</p>

              <
                Button className="btn-secondary"
                onClick={()=> removeFromTheCart(item.product)}
              > Remove
              </Button>
            </div>
          </Col>
          <Col className="col-4 col-lg-2 text-center d-flex align-items-center justify-content-center">
            <div>
              <button
                className="bg-success border-secondary text-white fw-bold"
                onClick={() =>
                  increaseQty(item.product, item.quantity, item.stock)
                }
              >
                +
              </button>
              <input
                value={item.quantity}
                style={{ width: "20px" }}
                className="broder-secondary"
                readOnly
              />
              <button
                className="bg-success border-secondary  text-white fw-bold"
                onClick={() => decreaseQty(item.product, item.quantity)}
              >
                -
              </button>
            </div>
          </Col>
          <Col className="col-2 col-lg-2 text-center  d-flex align-items-center justify-content-center">
            <div>
              <p>${item.price * item.quantity}</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CartItems;
