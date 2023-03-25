import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <div className="mx-3 mx-md-5 text-center text-sm-start my-5">
      <div className="row gx-0 gx-md-5 gy-5 gy-md-0 ">
        <div className="col-12 col-md-6">
          <div className="bg-image2 bg-height p-2 p-md-4 d-flex flex-column justify-content-center justify-content-sm-end text-white">
            <h4>20% off on Footwear</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              tenetur vel voluptates repellendus facere corporis esse animi
              ullam. Vero, voluptate.
            </p>
            <Link to="/products" className="btn border-white rounded-0 text-white">Shop Now</Link>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="bg-image3 bg-height p-2 p-md-4 d-flex flex-column justify-content-center justify-content-sm-end text-white">
            <h4>Latest Smartphones</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              tenetur vel voluptates repellendus facere corporis esse animi
              ullam. Vero, voluptate.
            </p>
            <Link to="/products" className="btn border-white rounded-0 text-white">Shop Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
