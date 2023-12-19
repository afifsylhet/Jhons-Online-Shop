import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faCalendarAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "../../../utils/axios";
import Steppers from "./Steppers";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  createUserOrder,
} from "../../../featuers/slice/orderSlice";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error, ownError } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
    if (ownError) {
      alert(ownError);
      dispatch(clearError());
    }
  }, [dispatch, alert, error, ownError]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemPrice = orderInfo?.subTotal;
    order.shippingPrice = orderInfo?.shippingCost;
    order.taxPrice = orderInfo?.tax;
    order.totalPrice = orderInfo?.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
      };

      res = await axios.post("/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };


          dispatch(createUserOrder(order));

          navigate("/success");
        } else {
          alert("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <Steppers currentStep={2} />
        <div className="row wrapper">
          <p className="mb-4 fs-4 fw-semibold text-center">Card Info</p>
          <div className="d-flex justify-content-center">
            <form
              onSubmit={paymentSubmitHandler}
              style={{ width: "100%", maxWidth: "350px" }}
              className="border border-2 border secondery p-3"
            >
              <div className="form-group">
                <label htmlFor="card_num_field">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="me-2 text-secondary"
                  />
                  Card Number
                </label>
                <CardNumberElement
                  type="text"
                  id="card_num_field"
                  className="form-control  mt-2"
                  options={options}
                />
              </div>

              <div className="form-group  mt-2">
                <label htmlFor="card_exp_field">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="me-2 text-secondary"
                  />
                  Card Expiry
                </label>
                <CardExpiryElement
                  type="text"
                  id="card_exp_field"
                  className="form-control mt-2"
                  options={options}
                />
              </div>

              <div className="form-group  mt-2">
                <label htmlFor="card_cvc_field">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="me-2 text-secondary"
                  />
                  Card CVC
                </label>
                <CardCvcElement
                  type="text"
                  id="card_cvc_field"
                  className="form-control  mt-2"
                  options={options}
                />
              </div>

              <button
                id="pay_btn"
                type="submit"
                className="text-center w-100 btn btn-warning mt-2"
              >
                Pay - {orderInfo && Math.round(orderInfo.totalPrice)}
              </button>
            </form>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Payment;
