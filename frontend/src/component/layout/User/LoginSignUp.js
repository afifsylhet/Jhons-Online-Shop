import React, { useEffect, useState } from "react";
import { Form, Button, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUserDetails,
  userLogin,
  userRegistration,
} from "../../../featuers/slice/userSlice";

const LoginSignUp = () => {
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split('=')[1] : '/account';


  const { isLoading, isAuthenticated, ownError, rgisterSuccess } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      alert("Login Success!");
      navigate(redirect);
      dispatch(loadUserDetails())
      dispatch(clearError())
    }
    if (ownError && ownError !== "Please login to access the resource") {
      alert(ownError);
      dispatch(clearError());
    }
    if (rgisterSuccess) {
      alert("Congratulations!!! Your account has been successfully created.");
      navigate("/account");
      dispatch(loadUserDetails())
      dispatch(clearError())
    }
  }, [isAuthenticated, navigate, ownError, rgisterSuccess]);

  // On submit handeler for register user

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const registerData = new FormData();
    registerData.append("name", name);
    registerData.append("email", email);
    registerData.append("password", password);
    registerData.append("avatar", selectedImage);

    // Perform registration logic here
    dispatch(userRegistration(registerData));

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    setSelectedImage(null);
  };

  // On submit handeler for login user

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const borderStyle = "border-bottom border-2 border-secondary";

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
          <div className="d-flex justify-content-between">
            <span
              className={`px-3 pb-1 fs-4 fw-semibold text-secondary ${
                !toggle && borderStyle
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setToggle(false)}
            >
              Login
            </span>
            <span
              className={`px-3 pb-1 fs-4 fw-semibold text-secondary ${
                toggle && borderStyle
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setToggle(true)}
            >
              Register
            </span>
          </div>
          <br />
          {/* For Login Section */}
          {!toggle && (
            <div>
              <Form onSubmit={handleLoginSubmit}>
                {/* Input for Email */}
                <Form.Group controlId="formEmail" className="mb-2">
                  <div className="input-group d-flex align-items-center fs-2 ">
                    <div className="input-group-prepend">
                      <span className="pe-2">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>

                {/* Input of Password */}
                <Form.Group controlId="formPassword" className="mb-2">
                  <div className="input-group d-flex align-items-center fs-2 ">
                    <div className="input-group-prepend">
                      <span className="pe-2">
                        <FontAwesomeIcon icon={faLock} />
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
                <NavLink
                  as={Link}
                  to="/password/forget"
                  className="text-end py-2"
                >
                  <p>Forget Password?</p>
                </NavLink>
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-100 mb-2"
                >
                  Login
                </Button>
              </Form>
            </div>
          )}
          {/* Register Section */}
          {toggle && (
            <div>
              <Form
                onSubmit={handleRegisterSubmit}
                encType="multipart/form-data"
              >
                {/* Name */}
                <Form.Group controlId="formName" className="mb-2">
                  <div className="input-group d-flex align-items-center fs-2">
                    <div className="input-group-prepend">
                      <span className="pe-2">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                {/* Email */}
                <Form.Group controlId="formEmail" className="mb-2">
                  <div className="input-group d-flex align-items-center fs-2">
                    <div className="input-group-prepend">
                      <span className="pe-2">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
                {/* Password */}
                <Form.Group controlId="formPassword" className="mb-2">
                  <div className="input-group d-flex align-items-center fs-2">
                    <div className="input-group-prepend">
                      <span className="pe-2">
                        <FontAwesomeIcon icon={faLock} />
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
                {/* Avatar */}
                <Form.Group controlId="formAvatar" className="mb-2">
                  <div className="input-group d-flex align-items-center fs-2">
                    <div className="input-group-prepend">
                      <span className="pe-2">
                        <FontAwesomeIcon icon={faImage} />
                      </span>
                    </div>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload} // Call the image upload function
                      required
                    />
                  </div>
                </Form.Group>
                {/* Image preview */}
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}
                {/* Register Button */}
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-100 mb-2"
                >
                  {" "}
                  Register{" "}
                </Button>{" "}
              </Form>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default LoginSignUp;
