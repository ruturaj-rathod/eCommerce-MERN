import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "@/App";
import store from "@/store";

import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
