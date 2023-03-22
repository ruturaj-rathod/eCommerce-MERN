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
      {/* Popular Product List */}
      <div className="bg-light">
        <div className="container py-5">
          <div className="d-flex justify-content-center">
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
    </Fragment>
  );
};

export default Home;
