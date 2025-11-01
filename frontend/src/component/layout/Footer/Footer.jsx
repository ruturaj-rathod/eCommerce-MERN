import React from "react";
import logo from "../../../images/logo.png";
import { Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className="border-top">
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-3 mt-3 text-center text-md-start">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Ecommerce" width='150' />
            </Link>
          </div>
          <div className="col-12 col-md-3 mt-5 mt-md-3 text-center text-md-start">
            <Typography className="fw-bold">Shop</Typography>
            <div className="d-flex flex-column mt-3">
              <Link to='/#' className="text-decoration-none">Hot Deals</Link>
              <Link to='/#' className="text-decoration-none">Categories</Link>
              <Link to='/#' className="text-decoration-none">Brands</Link>
              <Link to='/#' className="text-decoration-none">Weekly Deals</Link>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-5 mt-md-3 text-center text-md-start">
            <Typography className="fw-bold">Need help?</Typography>
            <div className="d-flex flex-column mt-3">
              <Link to='/#' className="text-decoration-none">Hot Deals</Link>
              <Link to='/#' className="text-decoration-none">Categories</Link>
              <Link to='/#' className="text-decoration-none">Brands</Link>
              <Link to='/#' className="text-decoration-none">Weekly Deals</Link>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-5 mt-md-3 text-center text-md-start">
            <Typography className="fw-bold">Contact</Typography>
            <div className="d-flex flex-column mt-3">
              <Link className="text-decoration-none">123, fifth streat, XYZ, 430010</Link>
              <Link className="text-decoration-none">ecommerce@info.com</Link>
              <Link className="text-decoration-none">90909 80808</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-4 fw-bold bg-light mt-3">
        Ecommerce Copyright &copy; 2023. All Right Reserve
      </div>
    </footer>
  );
};

export default Footer;
