import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { ROUTE_PATH } from "@/constants";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return null;
  }

  if (!isAuthenticated || (isAdmin && user?.role !== "admin")) {
    return <Navigate to={`/${ROUTE_PATH.LOGIN}`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
