import { Link } from "react-router";
import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

const CartBreadcrumbs = () => {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      <MuiLink component={Link} underline="hover" color="inherit" to="/">
        Home
      </MuiLink>
      <MuiLink
        component={Link}
        underline="hover"
        color="inherit"
        to="/products"
      >
        Shop
      </MuiLink>
      <Typography color="text.primary" fontWeight="medium">
        Shopping Cart
      </Typography>
    </Breadcrumbs>
  );
};

export default CartBreadcrumbs;
