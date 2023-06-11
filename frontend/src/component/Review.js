import React from "react";
import userProfile from "../images/userProfile.png";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const Review = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <>
      <Card>
        <div style={{ textAlign: "center" }}>
          <Card.Img
            variant="top"
            src={userProfile}
            alt={review.name}
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title className="d-flex justify-content-center">
              <ReactStars {...options} />
          </Card.Title>
          <Card.Title>{review?.name}</Card.Title>
          <Card.Text>{review?.comment}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Review;
