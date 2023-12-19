import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCity,
  faMapPin,
  faPhone,
  faGlobe,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveShippingDetails } from "../../../featuers/slice/cartSlice";
import Steppers from "./Steppers";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNum, setPhoneNum] = useState(shippingInfo.phoneNum);

  const shippingSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingDetails({ address, city, phoneNum, pinCode, state, country }));
    navigate( "/order/confirm");
  };

  return (
    <>
      <div>

        <Steppers currentStep={0}></Steppers>

        <div className="d-flex justify-content-center">
          <span className="px-3 pb-1 fs-3 fw-semibold text-secondary border-bottom border-2 border-secondary">
            Shipping Details
          </span>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <div
            style={{ width: "100%", maxWidth: "380px" }}
            className="bg-white pt-0 p-3 border border-secondery"
          >
            {/* Form Start form here */}
            <Form onSubmit={shippingSubmitHandler}>
              <Form.Group controlId="formAddress">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{
                    display: "inline",
                    position: "relative",
                    left: "15px",
                    top: "32px",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  className="ps-5"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <FontAwesomeIcon
                  icon={faCity}
                  style={{
                    display: "inline",
                    position: "relative",
                    left: "15px",
                    top: "32px",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  className="ps-5"
                  onChange={(e) => setCity(e.target.value)}
                  required
                  value={city}
                />
              </Form.Group>

              <Form.Group controlId="formPinCode">
                <FontAwesomeIcon
                  icon={faMapPin}
                  style={{
                    display: "inline",
                    position: "relative",
                    left: "15px",
                    top: "32px",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter your pin code"
                  className="ps-5"
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                  value={pinCode}
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{
                    display: "inline",
                    position: "relative",
                    left: "15px",
                    top: "32px",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  className="ps-5"
                  onChange={(e) => setPhoneNum(e.target.value)}
                  required
                  value={phoneNum}
                />
              </Form.Group>

              <Form.Group controlId="formCountry">
                <FontAwesomeIcon
                  icon={faGlobe}
                  style={{
                    display: "inline",
                    position: "relative",
                    left: "15px",
                    top: "32px",
                  }}
                />
                <Form.Control
                  as="select"
                  defaultValue="Choose Country"
                  className="ps-5"
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  value={country}
                >
                  <option value="">Choose Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formState">
                <FontAwesomeIcon
                  icon={faFlag}
                  style={{
                    display: "inline",
                    position: "relative",
                    left: "15px",
                    top: "32px",
                  }}
                />
                <Form.Control
                  as="select"
                  defaultValue="Choose State"
                  className="ps-5"
                  onChange={(e) => setState(e.target.value)}
                  required
                  value={state}
                >
                  <option value="">Choose State</option>
                  {country &&
                    State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  {/* Add more state options as needed */}
                </Form.Control>
              </Form.Group>
              <br />
              <Button
                variant="primary"
                type="submit"
                className="bg-secondary w-100"
              >
                CONTNUE
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Shipping;
