import { Input, PasswordInput } from "@mantine/core";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Grid from "../../../components/Grid/Grid";
import Helmet from "../../../components/Helmet/Helmet";
import { useAppDispatch } from "../../../redux/hook";
import { registerAPI, userInterface } from "../../../redux/reducer/user.slice";
import { messageError, messageSuccess } from "../../../utils/GlobalFunction";
import "../Login/login.scss";

const Register = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");

  const navigate = useNavigate();

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    const vnfRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (password.length < 6) {
      messageError("Mật khẩu phải phải dài tối thiểu 6 kí tự");
      return;
    } else if (password !== passwordAgain) {
      messageError("Mật khẩu và nhập lại mật khẩu phải giống nhau");
      return;
    } else if (tel !== "") {
      if (!vnfRegex.test(tel)) {
        messageError("Số điện thoại của bạn không đúng định dạng");
        return;
      }
    } else if (tel === "") {
      messageError("Bạn chưa điền số điện thoại!");
      return;
    }
    let data;
    if (username !== "" && password !== "" && address !== "") {
      data = {
        username: username.trim(),
        password: password.trim(),
        name: name.trim(),
        address: address.trim(),
        user_tel: tel.trim(),
      } as userInterface;
      dispatch(registerAPI(data))
        .unwrap()
        .then((registerResult) => {
          if (registerResult) {
            switch (registerResult.code) {
              case 200:
                messageSuccess(registerResult.success);
                navigate("/login", { replace: true });
                break;
              case 201:
                messageError(registerResult.error);
                break;
              case 202:
                messageError(registerResult.error);
                break;
              case 203:
                messageError(registerResult.error);
                break;
              default:
                return;
            }
          }
        });
    }
  };
  return (
    <Helmet title={"Đăng ký"}>
      <Grid col={1} mdCol={1}>
        <div className="main-log">
          <div className="main-form-heading">
            <NavLink to="/login" className="main-heading-link">
              Đăng nhập
            </NavLink>
            <NavLink to="/register" className="main-heading-link">
              Đăng ký
            </NavLink>
          </div>
          <form id="registerForm" className="main-form" onSubmit={register}>
            <div className="m-4">
              <Input
                placeholder="Tên đăng nhập (*)"
                size="md"
                className="form__input"
                value={username}
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div className="m-4">
              <Input
                placeholder="Họ tên (*)"
                size="md"
                className="form__input"
                value={name}
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="m-4">
              <Input
                type="tel"
                placeholder="Điện thoại (*)"
                size="md"
                className="form__input"
                value={tel}
                onChange={(e: any) => {
                  setTel(e.target.value);
                }}
                required
              />
            </div>
            <div className="m-4">
              <Input
                placeholder="Địa chỉ (*)"
                size="md"
                className="form__input"
                value={address}
                onChange={(e: any) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
            <div className="m-4">
              <PasswordInput
                placeholder="Mật khẩu (*)"
                className="form__input"
                size="md"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="m-4">
              <PasswordInput
                id="passwordAgain"
                className="form__input"
                size="md"
                value={passwordAgain}
                onChange={(e: any) => {
                  setPasswordAgain(e.target.value);
                }}
                placeholder="Nhập lại mật khẩu (*)"
                required
              />
            </div>
            <div className="m-4">
              <Button
                type="submit"
                animate
                icon="bx bx-registered"
                className="form__submit-button"
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Helmet>
  );
};

export default Register;
