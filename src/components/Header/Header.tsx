import React, { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getUser } from "../../redux/reducer/user.slice";
import MegaDropdown from "../MegaDropdown/MegaDropdown";
import Search from "../search/Search";
import "./header.scss";

type MainNavType = {
  display: string;
  path: string;
  megaDropdown?: boolean;
};

const mainNav: MainNavType[] = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
    megaDropdown: true,
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [userStore.login]);

  const headerRef = useRef<any>(null);

  useEffect(() => {
    const onScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const menuLeft = useRef<any>(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">Tuấn Vũ Order</Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                } ${item.megaDropdown ? "mega-dropdown" : ""}`}
                onClick={menuToggle}
              >
                <NavLink to={item.path}>
                  <span>
                    {item.display}{" "}
                    {item.megaDropdown && (
                      <i className="bx bxs-chevron-down"></i>
                    )}
                  </span>
                </NavLink>
                {item.megaDropdown && <MegaDropdown />}
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              {/* <i className="bx bx-search-alt"></i> */}
              <Search />
            </div>
            <div className="header__menu__item header__menu__right__item">
              <NavLink
                className={({ isActive }) => (isActive ? "link-active" : "")}
                to="/cart"
              >
                <i className="bx bx-shopping-bag"></i>
              </NavLink>
            </div>
            <div className="header__menu__item header__menu__right__item">
              {userStore.user ? (
                <NavLink
                  className={({ isActive }) => (isActive ? "link-active" : "")}
                  to="/user"
                >
                  <i className="bx bx-user"></i>
                  <span className="text-user">
                    {
                      userStore.user.name.split(" ")[
                        userStore.user.name.split(" ").length - 1
                      ]
                    }
                  </span>
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) => (isActive ? "link-active" : "")}
                  to="/login"
                >
                  <i className="bx bx-log-in"></i>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
