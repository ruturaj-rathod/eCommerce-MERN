import { Delete } from "@material-ui/icons";
import { Button } from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import "./Cart.css";
import NoCartItem from "./NoCartItem";

const Cart = ({ history }) => {
  const disptach = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    disptach(addItemsToCart(id, qty));
  };

  const decreaseQuantity = (id, quantity) => {
    if (1 >= quantity) {
      return;
    }
    const qty = quantity - 1;
    disptach(addItemsToCart(id, qty));
  };

  const removeItem = (id) => {
    disptach(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <NoCartItem />
      ) : (
        <Fragment>
          <div className="bg-light py-5">
            <div className="container h-custome d-flex flex-column flex-lg-row align-items-center align-items-md-start">
              {/* Cart Items container */}
              <div className="col-8">
                <div className="w-100 card" style={{ minWidth: "250px" }}>
                  <div className="card-header">
                    <h5 className="mb-0">Cart Items</h5>
                  </div>

                  <div className="card-body">
                    {cartItems?.map((item) => (
                      <div className="row border-bottom" key={item.product}>
                        {/* Product Image */}
                        <div className="text-end">
                          <span onClick={() => removeItem(item.product)}>
                            <Delete className="text-danger" />
                          </span>
                        </div>
                        <div className="col-12 col-md-4 text-center align-self-center">
                          <img
                            className="rounded"
                            src={item.image}
                            alt={item.name}
                            style={{ width: "150px" }}
                          />
                        </div>
                        <div className="col-12 col-md-8 d-flex flex-column align-items-center">
                          <p className="mb-1">
                            <strong>{item.name}</strong>
                          </p>
                          <p>
                            <strong>₹{item.price}</strong>
                          </p>
                          {/* Quantity handler Container */}
                          <div>
                            <button
                              onClick={() =>
                                decreaseQuantity(item.product, item.quantity)
                              }
                              className="qty-btn"
                            >
                              -
                            </button>
                            <span className="fs-4 mx-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                increaseQuantity(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                              className="qty-btn"
                            >
                              +
                            </button>
                          </div>
                          <p className="mt-3 border rounded p-1">
                            Subtotal:{" "}
                            <strong>₹{item.quantity * item.price}</strong>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Checkout Items container */}
              <div
                className="col-4 mt-5 mt-md-0 ms-0 d-flex justify-content-center"
                style={{ minWidth: "250px" }}
              >
                <div className="card">
                  <div className="card-header">
                    <h5>Summary</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p>
                        {`₹${cartItems.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )}`}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Products</p>
                      <p>{`${cartItems.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}`}</p>
                    </div>
                    <div className="border-top d-flex justify-content-between">
                      <p>Total Amount</p>
                      <p>
                        <strong>
                          {`₹${cartItems.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )}`}
                        </strong>
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button variant="contained" onClick={checkOutHandler}>
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
