import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { userInterface } from "../redux/reducer/user.slice";
import ChangePass from "../view/User/InfoUser/ChangePass";
import InfoForm from "../view/User/InfoUser/InfoForm";
import Order from "../view/User/InfoUser/Order";

const Home = React.lazy(() => import("../view/Home/Home"));
const Catalog = React.lazy(() => import("../view/Catalog/Catalog"));
const SearchPage = React.lazy(() => import("../view/SearchPage/SearchPage"));
const Product = React.lazy(() => import("../view/Product/Product"));
const Cart = React.lazy(() => import("../view/Cart/Cart"));
const PayPage = React.lazy(() => import("../view/PayPage/PayPage"));
const Contact = React.lazy(() => import("../view/Contact/Contact"));
const UserInfo = React.lazy(() => import("../view/User/InfoUser"));
const Register = React.lazy(() => import("../view/User/Register/Register"));
const Login = React.lazy(() => import("../view/User/Login/Login"));
const NotFound = React.lazy(() => import("../components/NotFound/NotFound"));

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/pay",
    element: <PayPage />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/catalog/:slug",
    element: <Catalog />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/search/:key",
    element: <SearchPage />,
  },
];

const Router = () => {
  const user = useAppSelector((state) => state.user.user) as userInterface;
  return (
    <Routes>
      <Route path="/user" element={<UserInfo />}>
        <Route index element={<Navigate to="info" replace />} />
        <Route
          path="info"
          element={
            <InfoForm
              nameUser={user?.name}
              addressUser={user?.address}
              telephoneUser={user?.user_tel}
            />
          }
        />
        <Route
          path="changePass"
          element={<ChangePass Password={user?.password} />}
        />
        <Route path="order" element={<Order userID={user?.user_id!} />} />
      </Route>
      {routes.map((route, i) => (
        <Route path={route.path} element={route.element} key={i} />
      ))}
    </Routes>
  );
};

export default Router;
