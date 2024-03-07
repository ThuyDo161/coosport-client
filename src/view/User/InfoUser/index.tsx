import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import InformationUser from "../../../components/InformationUser/InformationUser";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getUser, userInterface } from "../../../redux/reducer/user.slice";
import "./info-user.scss";

const InfoUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user) as userInterface;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      dispatch(getUser())
        .unwrap()
        .then((result) => {
          !result.success && navigate("/login", { replace: true });
        });
    }
  });
  return (
    <div className="user">
      <InformationUser userName={user?.name} />
      <Outlet />
    </div>
  );
};

export default InfoUser;
