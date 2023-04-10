import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Product from "./ProductCard.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import "./Home.css";
import Offer from "./Offer";
import GlobeImage from "./../../images/globe-free-img.png";
import LockImage from "./../../images/lock-free-img.png";
import QualityImage from "./../../images/quality-free-img.png";
import TagImage from "./../../images/tag-free-img.png";
import { Box, Typography } from "@mui/material";
import SpecialOffer from "./SpecialOffer";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Ecommerce" /> {/* title of the page */}
      <Box
        className="banner p-3 p-sm-5 banner-inner d-flex flex-column justify-content-center align-items-center align-items-sm-start"
      >
        <Typography variant="h3" component="div" className="my-3 text-center text-sm-start">
          Raining Offers For Hot Summer
        </Typography>
        <Typography variant="h5" component="div" className="my-3 text-center text-sm-start">
          25% Off On All Products
        </Typography>
        <div className="mt-2 mt-sm-5 pb-5">
          <button className="btn btn-dark rounded-0 me-3 me-sm-5">
            <a className="text-decoration-none text-white" href="#container">SHOP NOW</a>
          </button>
          <button className="btn btn-outline-light rounded-0">
            <a className="text-decoration-none text-white" href="#container">FIND MORE</a>
          </button>
        </div>
      </Box>
      {/* Offer layer*/}
      <Offer />
      {/* Popular Product List */}
      <div className="bg-light" id="popular-product">
        <div className="container py-5">
          <div className="d-flex justify-content-center py-2 py-sm-5">
            <h2 className="px-3 pb-2 border-bottom">Popular Product</h2>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="row justify-content-center justify-content-sm-start">
                {products &&
                  products.map((product, index) => (
                    <div
                      className="col-sx-12 col-sm-6 col-lg-4 col-xl-3 d-flex justify-content-center"
                      key={index}
                    >
                      <Product product={product} />
                    </div>
                  ))}
              </div>
            </Fragment>
          )}
        </div>
      </div>
      {/* Special Offer */}
      <SpecialOffer />
      {/* Why choose us */}
      <div className="d-flex flex-column flex-md-row text-center mt-4">
        <div className="px-2 py-2 px-sm-5 py-md-4 px-md-4">
          <img
            src={GlobeImage}
            className="img-thumbnail border-0 mb-3"
            alt="world wide shipping"
            width="80px"
          />
          <h5>WorldWid Shipping</h5>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            tempore praesentium nemo, fuga suscipit vero.
          </p>
        </div>
        <div className="px-2 py-2 px-sm-5 py-md-4 px-md-4 ">
          <img
            src={QualityImage}
            className="img-thumbnail border-0 mb-3"
            alt="Best Quality"
            width="80px"
          />
          <h5>Best Quality</h5>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            tempore praesentium nemo, fuga suscipit vero.
          </p>
        </div>
        <div className="px-2 py-2 px-sm-5 py-md-4 px-md-4">
          <img
            src={TagImage}
            className="img-thumbnail border-0 mb-3"
            alt="Best offers"
            width="80px"
          />
          <h5>Best Offers</h5>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            tempore praesentium nemo, fuga suscipit vero.
          </p>
        </div>
        <div className="px-2 py-2 px-sm-5 py-md-4 px-md-4">
          <img
            src={LockImage}
            className="img-thumbnail border-0 mb-3"
            alt="Secure Payment"
            width="80px"
          />
          <h5>Secure Payment</h5>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            tempore praesentium nemo, fuga suscipit vero.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
