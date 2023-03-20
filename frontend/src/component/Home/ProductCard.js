import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };
  return (
    <>
      <Link className="proudct-card" to={`/product/${product._id}`}>
        <Card
          sx={{
            backgroundColor: '#80828520',
            boxShadow: 'unset',
            width: 250,
            transition: "all 0.5s",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          <CardMedia
            sx={{ height: 300 }}
            image={product.images[0].url}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom sx={{font: '700 16px lato'}}component="div">
              {product.name}
            </Typography>
            <Box component="div" >
              <Rating {...options} />
              <Typography variant="caption" component="div" px={1}>
                ({product.numOfReviews} Review)
              </Typography>
            </Box>
            <Box
              component="div"
              my={1}
              px={1}
              sx={{ font: '700 12px lato' }}
            >
              {`₹${product.price}`}
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
