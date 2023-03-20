import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Product from "./ProductCard.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import "./Home.css";

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
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" /> {/* title of the page */}
          <div className="banner">
            <div className="banner-text">
              <h1>Raining Offers For Hot Summer!</h1>
              <h3>25% Off On All Products</h3>
              <div>
                <div>
                  <a className="button button-contain" href="#container">
                    SHOP NOW
                  </a>
                </div>
                <div>
                  <a className="button button-outline" href="#container">
                    FIND MORE
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h2 className="homeHeading">Featured Product</h2>
          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <Product key={index} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
