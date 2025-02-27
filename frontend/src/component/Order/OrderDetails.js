import { Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import axios from "axios";
import "./OrderDetails.css";

const OrderDetails = ({ match, history }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, alert, match.params.id]);

  const cancelOrderHandler = () => {
    axios
      .delete(`/api/v1/order/${order?._id}`)
      .then((res) => {
        if (res.data.success) {
          alert.success(res.data.message);
          history.push("/orders");
        } else {
          alert.show(res.data.message);
        }
      })
      .catch((error) => {
        alert.info(error.response.data.message);
      });
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Order Details`} />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">Order #{order?._id}</Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name: </p>
                  <span>{order.user.name}</span>
                </div>
                <div>
                  <p>Phone: </p>
                  <span>{order?.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address: </p>
                  <span>
                    {`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.country}, ${order?.shippingInfo.pinCode}.`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order?.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount: </p>
                  <span>{order?.totalPrice}</span>
                </div>
              </div>
              <Typography>Order status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>{order?.orderStatus}</p>
                </div>
                {order?.orderStatus !== "Delivered" ? (
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={cancelOrderHandler}
                    >
                      Cancel order
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items: </Typography>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      {item.options &&
                        Object.keys(item.options).map((key) => (
                          <p className="mb-1" key={key}>
                            {key}: {item.options[key]}
                          </p>
                        ))}
                    </div>
                    <span>
                      {item.quantity} x {item.price} ={" "}
                      <b>${item.quantity * item.price}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
