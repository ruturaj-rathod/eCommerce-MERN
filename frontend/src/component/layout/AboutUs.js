import React from "react";

const AboutUs = () => {
  return (
    <div className="h-custome bg-light">
      <div className="container py-5">
        {/* Our story */}
        <div className="pb-0 pb-sm-5">
          <h4 className="text-center fs-1">Our Story</h4>
          <div className="px-2 px-sm-5 text-center fs-3 fw-bold text-secondary">
            Taking a sustainable and quality product with a focus on creating a
            positive impact on both the world and the people
          </div>
        </div>
        {/* Ethics */}
        <div className="row mt-5 pt-5 text-center text-sm-start">
          <div className="col-12 col-md-4">
            <div className="fw-bold fs-5">Ethics and equality</div>
            <p className="text-secondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              vel temporibus maiores quam tenetur rerum nulla, esse eos labore
              dicta!
            </p>
          </div>
          <div className="col-12 col-md-4">
            <div className="fw-bold fs-5">Eco-design</div>
            <p className="text-secondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              vel temporibus maiores quam tenetur rerum nulla, esse eos labore
              dicta!
            </p>
          </div>
          <div className="col-12 col-md-4">
            <div className="fw-bold fs-5">Wildlife Preservation</div>
            <p className="text-secondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              vel temporibus maiores quam tenetur rerum nulla, esse eos labore
              dicta!
            </p>
          </div>
        </div>
        {/* Mission and Vission */}
        <div className="mt-5 bg-white p-3 rounded">
          <div className="row my-3">
            <div className="col-12 col-md-4 fw-bolder fs-5">Mission</div>
            <div className="col-12 col-md-8 fw-bold text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae voluptates quos incidunt? Libero debitis quis, sint
              ullam reiciendis ab fugiat totam deleniti magnam facilis dolore
              error dignissimos fuga cumque!
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 col-md-4 fw-bolder fs-5">Vision</div>
            <div className="col-12 col-md-8 fw-bold text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae voluptates quos incidunt? Libero debitis quis, sint
              ullam reiciendis ab fugiat totam deleniti magnam facilis dolore
              error dignissimos fuga cumque!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
