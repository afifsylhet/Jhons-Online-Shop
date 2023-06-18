import React, { useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  clearError, updateProfileReset, updateUserProfile,} from "../../../featuers/slice/profileSlice";
import { loadUserDetails } from "../../../featuers/slice/userSlice";

const UpdateProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user} = useSelector(
    (state) => state.user);

  const { error, isUpdated, isLoading, ownError, } = useSelector(
    (state) => state.profile);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setSelectedImage(user.avatar.url);
    }
    if (ownError) {
      alert(ownError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert("Congratulations!!! Your account has been successfully updated.");
      dispatch(loadUserDetails())
      navigate("/account");
      dispatch(updateProfileReset());
      console.log(isUpdated)
    }
  }, [user, ownError, isUpdated, user.avatar.url]);

  console.log(selectedImage)

  // On submit handeler for update user

  const handleUpdateSubmit = (e) => {
    const updateData = new FormData();
    updateData.append("name", name);
    updateData.append("email", email);
    updateData.append("avatar", selectedImage);
  
    // Perform update logic here
    dispatch(updateUserProfile(updateData));
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

  return (
    <div>
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
              Update Form
            </span>
            <br />
            <br />
            <Form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
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
                  />
                </div>
              </Form.Group>

              {/* Avatar */}
              <Form.Group controlId="formAvatar" className="mb-2">
                <div className="input-group d-flex align-items-center fs-2">
                  <div className="input-group-prepend">
                    <span className="pe-2">
                      <Image src={user?.avatar?.url} alt="user.name" 
                      style={{height: "50px"}}
                      />
                    </span>
                  </div>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload} // Call the image upload function
                    // required
                  />
                </div>
              </Form.Group>
              {/* Image preview
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )} */}
              {/* Register Button */}
              <Button variant="secondary" type="submit" className="w-100 mb-2">
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
