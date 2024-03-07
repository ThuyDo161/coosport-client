import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "../../routes/Router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ProductViewModal from "../ProductViewModal/ProductViewModal";
import ScrollTop from "../scrollTop/ScrollTop";
import "./loading.scss";

const Layout = () => {
  return (
    <Suspense
      fallback={
        <div id="preloader">
          <div id="loader"></div>
        </div>
      }
    >
      <BrowserRouter>
        <Header />
        <div className="container">
          <div className="main">
            <Router />
          </div>
        </div>
        <Footer />
        <ScrollTop />
        <ProductViewModal />
      </BrowserRouter>
    </Suspense>
  );
};

export default Layout;
