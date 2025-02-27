import {
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { PersonOutline, ShoppingCart } from "@material-ui/icons";
import "./Header.css";
import { useSelector } from "react-redux";
import logo from "./../../../images/logo.png";

function Navbar() {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="container d-flex align-items-center navbar">
      {/* Expand Menu for mobile view */}
      {isTablet ? (
        <div>
          <DrawerComponent />
        </div>
      ) : (
        ""
      )}
      {/* Brand Name */}
      {isTablet ? (
        <div className="flex-grow-1 d-flex justify-content-center">
          <Link to="/" className="navbar-brand">
          <img src={logo} alt="Ecommerce" width='130'/>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Ecommerce" width='200'/>
          </Link>
        </div>
      )}
      {/* Navbar Links */}
      {!isTablet ? (
        <div className="flex-grow-1">
          <ul className="navbar-nav d-flex flex-row justify-content-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      {/* Icon of Right Side */}
      <div className="d-flex me-2 me-sx-0">
        <Link to="/cart" className="nav-link">
          <ShoppingCart fontSize="small" />
          {cartItems?.length > 0 ? (
            <span class="badge rounded-pill bg-secondary">{cartItems?.length}</span>
          ) : ""}
        </Link>
        <Link to="/login" className="nav-link">
          <PersonOutline fontSize="small" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
