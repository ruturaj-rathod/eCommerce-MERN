import { Link } from "react-router";
import { Badge, IconButton } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { ROUTE_PATH } from "@/constants";
import useCartStore from "@/store/cart";

export default function CartIcon() {
  const cartCount = useCartStore((s) => s.cartCount);

  return (
    <Badge badgeContent={cartCount} color="primary" invisible={cartCount === 0}>
      <IconButton component={Link} to={ROUTE_PATH.CART} sx={{ p: 1.25 }}>
        <ShoppingBagOutlined />
      </IconButton>
    </Badge>
  );
}
