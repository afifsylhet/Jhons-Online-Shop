import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div>
        <Container>
          <Row xs={1} sm={1} md={1} lg={2}>
            <Col>
              <h3>My Profile</h3>
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <br />
                  <Image
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="border border-1 border-secondary rounded-circle p-2"
                    style={{ height: "150px" }}
                  />
                  <br />
                  <br />
                </div>
              </div>
              <Link to="/me/update" style={{width:"100%"}}>
                    <Button  className="btn btn-secondary text-center my-2 w-100"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                  <br />
                  <br />
            </Col>
            <Col>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <br />
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <br />
              <div>
                <h4>Joined On</h4>
                <p>
                  {user?.createdAt
                    ? String(user.createdAt.substr(0, 10))
                    : "10/06/2023"}
                </p>
              </div>
              <br />
              <Link to="/orders">
                <Button className="btn btn-secondary w-100 text-center my-2">
                  {" "}
                  My Orders
                </Button>
              </Link>
              <Link to="/password/update">
                <Button className="btn btn-secondary w-100 text-center my-2">
                  {" "}
                  Change Password
                </Button>
              </Link>
              <br/>
              <br/>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyProfile;
