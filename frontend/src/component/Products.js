import React, { useEffect, useState } from "react";
import Product from "./layout/home/Product";
import Paginations from "./Paginations";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../featuers/slice/productSlice";
import { useParams } from "react-router-dom";
import ReactSlider from "react-slider";
import "./ReactSlider.css";
import MetaData from "./layout/home/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Camera",
  "Backpack",
  "Headset",
  "Watch",
];

const Products = () => {
  const [value, setValue] = useState([0, 6000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");
  const [ratings, setRatings] = useState(0);

  let price = value;

  const renderThumb = (props, state) => {
    const { valueNow } = state;
    return <div {...props}>{valueNow}</div>;
  };

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  const { keyword } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ keyword, currentPage, price, catagory, ratings }));
  }, [dispatch, keyword, currentPage, price, catagory, ratings]);

  const { isLoading, isError, error, productCount, resultPerPage } =
    useSelector((state) => state.product);

  const { products } = useSelector((state) => state.product.products);

  let content = null;

  if (isLoading) {
    content = <p>LOADING...</p>;
  }

  if (!isLoading && isError) {
    content = <p style={{ color: "red" }}>{error}</p>;
  }

  if (!isLoading && !isError && products?.length === 0) {
    content = <p style={{ color: "red" }}>No Product Found</p>;
  }

  if (!isLoading && !isError && products?.length > 0) {
    content = products.map((product) => (
      <Product key={product._id} product={product} />
    ));
  }

  return (
    <>
      <MetaData title="PRODUCTS -Jhons Online Shop" />

      <div className="text-center">
        <span className="border-bottom border-2 border-secondary py-2 px-4 fs-3 fw-semibold">
          Products
        </span>
      </div>
      <br />
      <Row className="container-fluid">
        <Col className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
          <h4 className="fw-semibold">Price</h4>
          {/* React Slider Search By Price */}
          <ReactSlider
            value={value}
            min={0}
            max={7000}
            onChange={(value) => setValue(value)}
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            renderThumb={renderThumb}
          />
          <br />

          {/* Categories Section */}

          <style>
            {`
          .my-element {
            color: #888888;
            transition: color 0.3s;
          }

          .my-element:hover {
            color: #ff0000;
            font-weight: 700;
          }
        `}
          </style>

          <h4 className="fw-semibold">Categories</h4>
          <ul className="list-unstyled">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setCatagory(category)}
                className="my-element"
              >
                {category}
              </li>
            ))}
          </ul>
          <br />
          {/* React Slider Search By Ratings */}
          <fieldset>
            <h4>Ratings Above</h4>
            <ReactSlider
              value={ratings}
              min={0}
              max={5}
              onChange={(value) => setRatings(value)}
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              renderThumb={renderThumb}
            />
          </fieldset>
        </Col>
        <Col className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9">
          <Row xs={1} sm={2} md={3} lg={4}>
            {content}
          </Row>
        </Col>
      </Row>

      {/* Bootstrap Paginations} */}
      {products?.length && (
        <div className="d-flex justify-content-center">
          <Paginations
            productCount={productCount}
            resultPerPage={resultPerPage}
            products={products}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
      <br></br>
    </>
  );
};

export default Products;
