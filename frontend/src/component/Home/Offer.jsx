import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <div className="container text-center text-sm-start my-5">
      <div className="row gx-0 gx-lg-5 gy-4 gy-lg-0 ">
        <div className="col-12 col-lg-4">
          <div className="bg-image1 bg-height d-flex align-items-end">
            <div className="container bg-blend py-3 d-flex flex-column justify-content-end text-white align-items-lg-start align-items-center">
              <h4>20% off on Footwear</h4>
              <p className="text-center text-lg-start">
                Lorem ipsum dolor sit amet, consectetur 
              </p>
              <div className="w-auto mx-auto">
                <Link to="/products" className="btn border-white rounded-0 text-white">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="bg-image2 bg-height d-flex align-items-end">
            <div className="container bg-blend py-3 d-flex flex-column justify-content-end text-white align-items-lg-start align-items-center">
              <h4>20% off on Footwear</h4>
              <p className="text-center text-lg-start">
                Lorem ipsum dolor sit amet, consectetur 
              </p>
              <div className="w-auto mx-auto">
                <Link to="/products" className="btn border-white rounded-0 text-white">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="bg-image3 bg-height d-flex align-items-end">
            <div className="container bg-blend py-3 d-flex flex-column justify-content-end text-white align-items-lg-start align-items-center">
              <h4>20% off on Footwear</h4>
              <p className="text-center text-lg-start">
                Lorem ipsum dolor sit amet, consectetur 
              </p>
              <div className="w-auto mx-auto">
                <Link to="/products" className="btn border-white rounded-0 text-white">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Offer;
