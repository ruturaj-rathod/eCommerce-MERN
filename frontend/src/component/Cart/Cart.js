import { Typography } from "@material-ui/core";
import { RemoveShoppingCart } from "@material-ui/icons";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import "./Cart.css";
import CartItemCardMd from "./CartItemCardMd";

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

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCart />
          <Typography>No product in cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <CartItemCardMd items={cartItems} />

          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "300px",
              margin: '30px auto',
              boxShadow: "unset",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
          >
            <Table sx={{ maxWidth: 300 }} aria-label="caption table">
              <TableHead sx={{ backgroundColor: "#80828520" }}>
                <TableRow>
                  <TableCell>Cart Totals</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell>Total</TableCell>
                  <TableCell align="right">
                    {`$${cartItems.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}`}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={checkOutHandler}>
                      Check out
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
