import React, { useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearError, resetUserPassword } from "../../../featuers/slice/profileSlice";


const ResetPassword = () => {
  const params = useParams();
  const{token} = params;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { ownError, success } = useSelector((state) => state.profile);

    useEffect(() => {
      if (ownError) {
        alert(ownError);
        dispatch(clearError());
      }
      if (success) {
        alert("Congratulations!!! Your password has been successfully updated.");
        navigate("/login");
      }
    }, [ownError, success, dispatch, navigate]);

// On submit handler for reset password
const handleResetPassword = async (e) => {
  e.preventDefault();

  const resetPasswordData = new FormData();
  resetPasswordData.append("password", password);
  resetPasswordData.append("confirmPassword", confirmPassword);

  console.log(resetPasswordData)
  dispatch(resetUserPassword({ token, resetPasswordData }));
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
            Reset Password
          </span>
          <br />
          <br />
          <Form onSubmit={handleResetPassword} encType="multipart/form-data">
            {/* New Password */}
            <Form.Group controlId="formPassword" className="mb-2">
              <div className="input-group d-flex align-items-center fs-2">
                <div className="input-group-prepend">
                  <span className="pe-2">
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </span>
                </div>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group controlId="formPassword" className="mb-2">
              <div className="input-group d-flex align-items-center fs-2">
                <div className="input-group-prepend">
                  <span className="pe-2">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </div>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>
            <br />
            {/* Reset Password Button */}
            <Button variant="secondary" type="submit" className="w-100 mb-2">
              Reset Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
