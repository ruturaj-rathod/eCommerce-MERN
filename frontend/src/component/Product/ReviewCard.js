import { Rating } from "@material-ui/lab";
import { Avatar } from "@mui/material";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="review-card text-center border p-4 rounded shadow m-3">
      <Avatar
        src={profilePng}
        sx={{ width: 56, height: 56, margin: "auto" }}
        alt="user"
      />
      <p className="mb-1">{review.name}</p>
      <Rating {...options} />
      <p className="mt-2">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
