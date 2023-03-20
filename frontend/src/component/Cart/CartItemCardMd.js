import { Cancel } from "@material-ui/icons";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemsFromCart } from "../../actions/cartAction";

const CartItemCardMd = ({ items }) => {
  const disptach = useDispatch();
  const removeItem = (id) => {
    disptach(removeItemsFromCart(id));
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "90%",
        margin: "auto",
        boxShadow: "unset",
        marginTop: "30px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#80828520" }}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((item) => (
            <TableRow
              key={item.product}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <span
                  onClick={() => removeItem(item.product)}
                  style={{ cursor: "pointer" }}
                >
                  <Cancel />
                </span>
              </TableCell>
              <TableCell align="center">
                <img src={item.image} width="100" alt="ssa" />
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{`₹${
                item.price * item.quantity
              }`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemCardMd;
