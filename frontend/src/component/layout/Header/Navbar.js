import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { PersonOutline, ShoppingCart } from "@material-ui/icons";
import "./Header.css";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
    position="relative"
      style={{
        backgroundColor: "#80828520",
        boxShadow: "unset",
      }}
    >
      <CssBaseline />
      <Toolbar>
        {isMobile ? <DrawerComponent /> : ""}
        <Typography variant="h5" color="black" className="brand-logo">
          Ecommerce
        </Typography>

        {!isMobile ? (
          <div>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              Product
            </Link>
            <Link to="/contact" className="nav-link">
              contact
            </Link>
            <Link to="/faq" className="nav-link">
              About
            </Link>
          </div>
        ) : (
          ""
        )}

        <Box className="icon-container">
          <Link to="/cart" className="nav-link">
            <ShoppingCart size="large" />
          </Link>
          <Link to="/login" className="nav-link">
            <PersonOutline size="large" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
