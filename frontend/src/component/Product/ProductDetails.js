import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import "./ProductDetails.css";
import ProductCard from "../Home/ProductCard";

const ProductDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, products, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    let qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (product.stock <= 0) {
      alert.show("Product is out of stock");
      return;
    }
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCT DETAILS" />
          <div className="bg-light py-5 h-100">
            <div className="container">
              <div className="d-flex flex-column flex-md-row">
                <div className="text-center">
                  <Carousel>
                    {product?.images &&
                      product.images?.map((item, i) => (
                        <img
                          src={item.url}
                          className="CarouselImage"
                          key={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>
                <div className="mx-auto ps-3 text-center text-md-start">
                  <h6 className="fs-3 text-secondary">{product?.name}</h6>
                  <p className="fs-6 text-muted fst-italic">
                    {product?.category}
                  </p>
                  <div className="d-flex align-items-center border-top border-bottom py-3">
                    <Rating {...options} />
                    <span>({product?.numOfReviews} Reviews)</span>
                  </div>
                  <h6 className="fs-3 my-3">{`₹${product?.price}`}</h6>
                  <div className="mb-3">
                    <button className="qty-btn" onClick={decreaseQuantity}>
                      -
                    </button>
                    <span className="fs-4 mx-2">{quantity}</span>
                    <button className="qty-btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                  <p
                    className={
                      product?.stock < 1
                        ? "text-danger fw-bolder"
                        : "text-success fw-bolder"
                    }
                  >
                    {product?.stock < 1 ? "Out of stock" : "Instock"}
                  </p>
                  <Button
                    variant="contained"
                    className="bg-primary text-white mb-3"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
              {/* Product Description */}
              <div className="mt-5 text-center">
                <div>
                  <p className="fs-5 fw-bolder text-muted">Description</p>
                  <p>{product?.description}</p>
                </div>
              </div>

              {/* Related Product */}
              {products.length > 0 ? (
                <div className="mt-5 container">
                  <div className="d-flex justify-content-center">
                    <h3 className="px-3 pb-2 border-bottom">
                      Suggestion For You
                    </h3>
                  </div>
                  <div className="row flex-nowrap overflow-scroll">
                    {products &&
                      products.map((product, index) => (
                        <div
                          className="col-sx-12 col-sm-6 col-lg-4 col-xl-3 d-flex justify-content-center"
                          key={index}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* Reviews Container */}
              <div className="my-5">
                <div className="d-flex justify-content-center">
                  <h3 className="px-3 pb-2 border-bottom">
                    Reviews({product?.numOfReviews})
                  </h3>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="contained"
                    className="bg-secondary text-white"
                    onClick={submitReviewToggle}
                  >
                    Submit Review
                  </Button>
                </div>
                {product?.reviews[0] ? (
                  <div className="d-flex review-container">
                    {product?.reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="noReviews mt-3">No Reviews Yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Review Dialog Box */}
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="d-flex flex-column">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
