import { RemoveShoppingCart } from "@material-ui/icons";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NoCartItem = () => {
  return (
    <div className="empty-cart-container bg-light">
      <RemoveShoppingCart className="text-danger fs-1" />
      <div className="fs-1 my-1">No Product In Cart</div>
      <Link to="/products" className="nav-link my-3">
        <Button variant="contained">View Products</Button>
      </Link>
    </div>
  );
};

export default NoCartItem;
