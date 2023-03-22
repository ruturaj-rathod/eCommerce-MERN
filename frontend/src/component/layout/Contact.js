import { LocationCity, Phone } from "@material-ui/icons";
import { Button } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <div className="h-custome">
      <div className="container my-5">
        <div>
          <div className="fs-1 text-center fw-bold">Contact</div>
        </div>
        <div className="mt-2 mt-sm-5 row bg-light p-3 rounded">
          <div className="col-12 col-md-5">
            <div className="mx-2 my-3">
              <div className="d-flex align-items-center flex-column flex-md-row">
                <Phone />
                <p className="fs-5 ms-0 ms-md-3 mb-0 fw-bold">
                  Products &#38; order
                </p>
              </div>
              <div className="ms-0 ms-md-4 ps-0 ps-md-3 text-center text-md-start">
                <p>
                  (+1) 123-456-7890 <br /> available 24/7
                </p>
              </div>
            </div>
            <div className="mx-2 my-3">
              <div className="d-flex align-items-center flex-column flex-md-row">
                <Phone />
                <p className="fs-5 ms-0 ms-md-3 mb-0 fw-bold">
                  Info &#38; enquiries
                </p>
              </div>
              <div className="ms-0 ms-md-4 ps-0 ps-md-3 text-center text-md-start">
                <p>
                  (+1) 123-456-7890 <br /> available 24/7
                </p>
              </div>
            </div>
            <div className="mx-2 my-3">
              <div className="d-flex align-items-center flex-column flex-md-row">
                <LocationCity />
                <p className="fs-5 ms-0 ms-md-3 mb-0 fw-bold">
                  Store locator
                </p>
              </div>
              <div className="ms-0 ms-md-4 ps-0 ps-md-3 text-center text-md-start">
                <p>
                  (+1) 123-456-7890 <br /> available 24/7
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  comment
                </label>
                <textarea
                  name="comment"
                  className="form-control"
                  id="comment"
                  cols="30"
                  rows="3"
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <Button variant="contained">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
