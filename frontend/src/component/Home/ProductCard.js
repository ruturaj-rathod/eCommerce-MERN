import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };
  return (
    <>
      <div className="card my-3 border-0 rounded-0">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <img
            className="card-img-top  rounded-0"
            src={product.images[0].url}
            alt={product.name}
          />
          <div className="card-body">
            <h5 className="mb-1 text-black">{product.name}</h5>
            <p className="mb-1 fw-lighter text-muted">{product.category}</p>
            <p className="ff-lato mb-0 fw-bolder">{`₹${product.price}`}</p>
            <Rating {...options} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
