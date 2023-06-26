import React, { useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faKey, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePasswordReset, updateUserPassword } from "../../../featuers/slice/profileSlice";

const UpdatePassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {ownError, isUpdated} = useSelector((state)=> state.profile)

  useEffect(() => {
    if (ownError) {
      alert(ownError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert("Congratulations!!! Your password has been successfully updated.");
      navigate("/account");
      dispatch(updatePasswordReset())
    }
  }, [ownError, isUpdated, dispatch, navigate]);

  // On submit handler for update user
  const handleUpdatePassward = async (e) => {
    e.preventDefault();

    const updatedPassword = new FormData();
    updatedPassword.append("oldPassword", oldPassword);
    updatedPassword.append("newPassword", newPassword);
    updatedPassword.append("confirmPassword", confirmPassword);
    dispatch(updateUserPassword(updatedPassword));

    // Reset the password field
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
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
            Change Password
          </span>
          <br />
          <br />
          <Form onSubmit={handleUpdatePassward} encType="multipart/form-data">
            {/* Old Password */}
            <Form.Group controlId="formPassword" className="mb-2">
              <div className="input-group d-flex align-items-center fs-2">
                <div className="input-group-prepend">
                  <span className="pe-2">
                    <FontAwesomeIcon icon={faKey} />
                  </span>
                </div>
                <Form.Control
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

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
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

            {/* Change Password Button */}
            <Button variant="secondary" type="submit" className="w-100 mb-2">
              Change Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
