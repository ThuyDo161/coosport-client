import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOutAccount, userInterface } from "../../redux/reducer/user.slice";
import "./InformationUser.scss";

function InfomationUser({ userName }: { userName: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user) as userInterface;
  const logOut = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logOutAccount());
    navigate("/login", { replace: true });
  };
  return (
    <div className="user__info">
      <div className="user__info-img">Ht-Shop</div>
      <div className="user__info-name">{userName}</div>
      <ul className="user__info-actions">
        <li className="user__info-actions-item">
          <NavLink to="info" className="user__info-link">
            Thông tin tài khoản
          </NavLink>
        </li>
        <li className="user__info-actions-item">
          <NavLink to="changePass" className="user__info-link">
            Đổi mật khẩu
          </NavLink>
        </li>
        <li className="user__info-actions-item">
          <NavLink to="order" className="user__info-link">
            Lịch sử đặt hàng
          </NavLink>
        </li>
        <li className="user__info-actions-item" style={{ fontWeight: "bold" }}>
          <NavLink to="/logout" onClick={logOut} className="user__info-link">
            Đăng xuất
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default InfomationUser;
