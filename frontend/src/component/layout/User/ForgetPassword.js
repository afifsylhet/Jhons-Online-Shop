import React, { useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  forgetUserPassword,
  updateUserPassword,
} from "../../../featuers/slice/profileSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { ownError, message } = useSelector((state) => state.profile);

    useEffect(() => {
      if (ownError) {
        alert(ownError);
        dispatch(clearError());
      }
      if (message) {
        alert(message);
      }
    }, [ownError, message, dispatch]);

  // On submit handler for update user
  const forgetPasswordSubmit = async (e) => {
    e.preventDefault();

    const forgetPasswordEmail = new FormData();
    forgetPasswordEmail.append("email", email);

    dispatch(forgetUserPassword(forgetPasswordEmail));
  };

  return (
    <div style={{ height: "90vh" }}>
      <div
        className="d-flex justify-content-center align-items-center bg-light "
        style={{ height: "90vh" }}
      >
        <div
          style={{ width: "100%", maxWidth: "450px" }}
          className="bg-white p-3"
        >
          <span className="text-center px-3 pb-1 fs-4 fw-semibold text-secondary border-bottom border-2 border-secondary">
            Forget Password
          </span>
          <br />
          <br />
          <br />
          <Form onSubmit={forgetPasswordSubmit} encType="multipart/form-data">
            {/* Email */}
            <Form.Group controlId="formPassword" className="mb-2">
              <div className="input-group d-flex align-items-center fs-2">
                <div className="input-group-prepend">
                  <span className="pe-2">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </div>
                <Form.Control
                  type="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Form.Group>
            <br />
            <br />
            {/* Change Password Button */}
            <Button variant="secondary" type="submit" className="w-100 mb-2">
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
