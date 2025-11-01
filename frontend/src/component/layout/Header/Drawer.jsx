import React, { Fragment, useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Fragment>
      <Drawer
        anchor="left"
        sx={{ color: "#fff" }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="container d-flex flex-column navbar">
          {/* Brand Name */}
          <div className="d-flex align-items-center px-2 mb-2">
            <Link
              to="/"
              className="navbar-brand"
              onClick={() => setOpenDrawer(false)}
            >
              Ecommerce
            </Link>
            <CloseIcon fontSize="small" onClick={() => setOpenDrawer(false)} />
          </div>
          {/* Navigation Link */}
          <div className="p-2 w-100 border-top text-center">
            <Link to="/" class="nav-link" onClick={() => setOpenDrawer(false)}>
              Home
            </Link>
          </div>
          <div className="p-2 w-100 border-top text-center">
            <Link
              to="/products"
              class="nav-link"
              onClick={() => setOpenDrawer(false)}
            >
              Product
            </Link>
          </div>
          <div className="p-2 w-100 border-top text-center">
            <Link
              to="/contact"
              class="nav-link"
              onClick={() => setOpenDrawer(false)}
            >
              Contact
            </Link>
          </div>
          <div className="p-2 w-100 border-top border-bottom text-center">
            <Link
              to="/about"
              class="nav-link"
              onClick={() => setOpenDrawer(false)}
            >
              About
            </Link>
          </div>
        </div>
      </Drawer>
      <IconButton
        className="menu-icon"
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </Fragment>
  );
};

export default DrawerComponent;
