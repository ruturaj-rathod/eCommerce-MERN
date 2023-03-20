import React from 'react';
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div>
        <div className="leftFooter">
            <h4>Download our app</h4>
            <p>Download app for android and iOS mobile phone</p>
            <img src={Appstore} alt="" />
            <img src={Playstore} alt="" />
        </div>
        <div className="rightFooter">
            <h4>FOLLOW US</h4>
            <a href="http://instagram.com/">Instagram</a>
            <a href="http://facebook.com/">Facebook</a>
            <a href="http://twitter.com/">Twitter</a>
        </div>
        </div>
        <p>Ecommerce Copyright &copy; 2023. All Right Reserve</p>
    </footer>
  )
}

export default Footer