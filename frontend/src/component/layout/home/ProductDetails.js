import React, { useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Review from "../../Review";
import MetaData from "./MetaData";
import { fetchProductDetails } from "../../../featuers/slice/productSlice";

const ProductDetails = ({ params }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const newProduct = product?.product;
  console.log(newProduct);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "#198754",
    size: window.innerWidth < 600 ? 20 : 25,
    value: newProduct?.ratings,
    isHalf: true,
  };

  return (
    <>
      <MetaData title={`${newProduct?.name} Jhons Online Shop`}/>

      {isLoading ? (
        <p> LOADING ...</p>
      ) : (
        <>
          <Row
            xs={1}
            md={2}
            className="d-flex p-5"
            style={{ backgroundColor: "#dadada" }}
          >
            <Col className="p-4 border border-3 border-light d-flex align-items-center justify-content-center">
              <div>
                <Image
                  className="rounded"
                  fluid
                  src={newProduct?.images[0]?.url}
                  alt="Your Image"
                />
              </div>
            </Col>
            <Col className="p-4 border border-3 border-light d-flex align-items-center">
              <div>
                <h3>{newProduct?.name}</h3>
                <p> Product Id #{newProduct?._id}</p>
                <p className=" d-flex align-items-center py-2 border-2 border-bottom border-top border-light">
                  <ReactStars {...options} />
                  <span className="ps-2">
                    {newProduct?.numOfReviews} Reviews
                  </span>
                </p>
                <p className="fs-3">$ {newProduct?.price}</p>
                <div>
                  <button className="bg-success border-secondary text-white fw-bold">
                    +
                  </button>
                  <input
                    value={1}
                    style={{ width: "45px" }}
                    className="broder-secondary ps-3"
                  />
                  <button className="bg-success border-secondary  text-white fw-bold">
                    -
                  </button>
                  <button className="bg-secondary rounded ms-3 text-white fw-semibold">
                    Add to Cart
                  </button>
                </div>
                <br />
                <p>
                  Status:{" "}
                  <span className="text-success">
                    {newProduct?.stock > 0 ? "InStock" : "OutOfStock"}
                  </span>
                </p>
                <h4>Description:</h4>
                <p>{newProduct?.description}</p>
                <button className="px-4 bg-secondary rounded text-white fw-semibold">
                  Submit Review
                </button>
              </div>
            </Col>
          </Row>
          <div style={{ backgroundColor: "#dadada" }}>
            <div className="text-center">
              <span className="px-5 pb-2 text-secondary fs-3 fw-semibold border-3 border-light border-bottom text-center">
                REVIEWS
              </span>
            </div>
            <br />
            <Row
              xs={1}
              md={3}
              lg={4}
              className="d-flex justify-content-center gap-2"
            >
              {newProduct?.reviews && newProduct?.reviews[0] ? (
                newProduct?.reviews?.map((review) => (
                  <Review key={review._id} review={review} />
                ))
              ) : (
                <p className="text-center text-success fs-4 my-4">
                  {" "}
                  No reviews yet
                </p>
              )}
            </Row>
            <br />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
