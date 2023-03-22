import React from "react";
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-light shadow">
      <div className="container pt-4 pb-1">
        <div className="row mb-5">
          <div className="col-12 col-sm-6 text-center text-sm-start">
              <h4>Download our app</h4>
              <p>Download app for android and iOS mobile phone</p>
              <img src={Appstore} alt="Appstore" className="footer-image" />
              <img src={Playstore} alt="Playstore" className="footer-image" />
            </div>
          <div className="col-12 col-sm-6 mt-4 mt-sm-0 text-center text-sm-start">
              <h4>FOLLOW US</h4>
              <a className="nav-link ms-0" href="http://instagram.com/">
                Instagram
              </a>
              <a className="nav-link ms-0" href="http://facebook.com/">
                Facebook
              </a>
              <a className="nav-link ms-0" href="http://twitter.com/">
                Twitter
              </a>
          </div>
        </div>
        <p className="text-center fw-bolder fw-normal mb-0">
          Ecommerce Copyright &copy; 2023. All Right Reserve
        </p>
      </div>
    </footer>
  );
};

export default Footer;
