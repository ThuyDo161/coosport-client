import { Input, PasswordInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Grid from "../../../components/Grid/Grid";
import Helmet from "../../../components/Helmet/Helmet";
import { useAppDispatch } from "../../../redux/hook";
import { loginAPI } from "../../../redux/reducer/user.slice";
import { messageError, messageSuccess } from "../../../utils/GlobalFunction";
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = (e: any) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    dispatch(loginAPI(data))
      .unwrap()
      .then((result: any) => {
        if (result) {
          switch (result.code) {
            case 200:
              messageSuccess(result.success);
              navigate("/", { replace: true });
              break;
            case 201:
              messageError(result.error);
              break;
            default:
              return;
          }
        }
      });
  };

  return (
    <Helmet title="Đăng nhập">
      <Grid col={1} mdCol={1} smCol={1}>
        <div className="main-log">
          <div className="main-form-heading">
            <NavLink to="/login" className="main-heading-link">
              Đăng nhập
            </NavLink>
            <Link
              to="/register"
              className="main-heading-link text-decoration-none"
            >
              Đăng ký
            </Link>
          </div>
          <form className="main-form" onSubmit={login}>
            <div className="m-4">
              <Input
                type="text"
                placeholder="Nhập email hoặc tên đăng nhập (*)"
                autoComplete="username"
                size="lg"
                className="form__input"
                value={username}
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div className="m-4">
              <PasswordInput
                placeholder="Mật khẩu (*)"
                className="form__input"
                autoComplete="current-password"
                size="lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="m-4">
              <Button
                animate={true}
                icon="bx bx-log-in-circle"
                type="submit"
                className="form__submit-button"
              >
                Đăng nhập
              </Button>
            </div>
          </form>
          <Link
            to="/"
            className="forgot-password main-link text-decoration-none"
          >
            Quên mật khẩu
          </Link>
        </div>
      </Grid>
    </Helmet>
  );
};

export default Login;
