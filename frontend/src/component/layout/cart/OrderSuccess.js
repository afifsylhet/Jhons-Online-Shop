import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const OrderSuccess = () => {
  return (
    <div className="text-warniong d-flex align-items-center justify-content-center"
    style={{height:"100vh"}}
    >
      <div>
        <div className="text-center fs-1">
        <FontAwesomeIcon icon={faCheck} />
        </div>
        <h2 className="m-4 text-center"> Your order successfull</h2>
        <div className="text-center">
        <Button className="text-center">View Order Details</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
