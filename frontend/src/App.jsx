import React, { useState } from "react";
import { RouterProvider } from "react-router/dom";
import { useSelector } from "react-redux";
import axios from "axios";
import webFont from "webfontloader";

import { loadUser } from "@/actions/userAction";
import router from "@/routes";
import store from "@/store";
import AppProviders from "./providers";

import "./App.css";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Lato"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
