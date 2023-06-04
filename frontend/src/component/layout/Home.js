import React, { useEffect } from "react";
import "./css/Home.css";
import { faComputerMouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "./Product.js";
import { Container, Row } from "react-bootstrap";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../featuers/slice/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { isLoading, isError, error } = useSelector((state) => state.product);

  const { products } = useSelector((state) => state.product.products);

  let content = null;

  if (isLoading) {
    content = <p>LOADING...</p>;
  }

  if (!isLoading && isError) {
    content = <p style={{ color: "red" }}>There was an error occured</p>;
  }

  if (!isLoading && !isError && products?.length === 0)
    <p style={{ color: "red" }}>No Product Found</p>;

  if (!isLoading && !isError && products?.length > 0) {
    content = products.map((product) => (
      <Product key={product._id} product={product} />
    ));
  }

  return (
    <>
      <MetaData title="Jhons Online Shop" />
      <div className="banner">
        <p className="fs-bold my-2 fs-3"> Wellcome to Jhons Online Shop</p>
        <h1 className="fs-bold py-4">FIND AMAZING PRODUCT BELLOW</h1>
        <a className="fs-bold my-2" href="#scrollId">
          <button className="btn btn-secondary">
            Scroll <FontAwesomeIcon className="ms-2" icon={faComputerMouse} />
          </button>
        </a>
        <br />
        <br />
      </div>
      <br />
      <br />
      <h3 className=" text-center  border-bottom border-2 pb-2">
        Features Product
      </h3>
      <br />
      <div id="scrollId">
        <Container fluid>
          <Row xs={1} sm={2} md={2} lg={4}>
            {content}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
