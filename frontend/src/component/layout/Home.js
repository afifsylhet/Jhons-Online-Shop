import React from "react";
import "./css/Home.css";
import { faComputerMouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "./Product.js";
import { Container, Row } from "react-bootstrap";
import MetaData from "./MetaData";

const product = {
  name: "Product 1",
  img: [
    "https://media.gettyimages.com/id/1179420343/photo/smiling-man-outdoors-in-the-city.jpg?s=612x612&w=gi&k=20&c=n663L5A4XlwcUvNpX_eu4ur1sMmrD6dt_c1mbWjrLXk=",
  ],
  price: 1200,
  _id: "kajskjdf45sfs",
};

const Home = () => {
  return (
    <>
    <MetaData title="Jhons Online Shop"/>
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
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />

          </Row>
          </Container>
      </div>
    </>
  );
};

export default Home;
