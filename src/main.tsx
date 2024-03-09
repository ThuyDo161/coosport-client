import "boxicons";
import "boxicons/css/boxicons.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "@coreui/coreui/dist/css/coreui.min.css";
import "sweetalert2/src/sweetalert2.scss";
import Layout from "./components/Layout/Layout";
import { store } from "./redux/store";
import "./sass/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
