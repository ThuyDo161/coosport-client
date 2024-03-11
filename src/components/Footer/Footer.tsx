import React from "react";
import { Link } from "react-router-dom";
import Grid from "../Grid/Grid";
import "./footer.scss";

const footerAboutLinks = [
  {
    display: "Giới thiệu",
    path: "/contact",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
  {
    display: "Tuyển dụng",
    path: "/contact",
  },
  {
    display: "Tin tức",
    path: "/contact",
  },
  {
    display: "Hệ thống cửa hàng",
    path: "/contact",
  },
];

const footerCustomerLinks = [
  {
    display: "Chính sách đổi trả",
    path: "/about",
  },
  {
    display: "Chính sách bảo hành",
    path: "/about",
  },
  {
    display: "Chính sách hoàn tiền",
    path: "/about",
  },
];
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Tổng đài hỗ trợ</div>
            <div className="footer__content">
              <p>Liên hệ đặt hàng</p>
              <p>Thắc mắc đơn hàng</p>
              <p>Góp ý, khiếu nại</p>
            </div>
          </div>
          <div>
            <div className="footer__title">Về Tuấn Vũ Order</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">Chăm sóc khách hàng</div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/">Tuấn Vũ Order</Link>
            </p>
            <p>
              Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng
              triệu người tiêu dùng Việt. Hãy cùng Tuấn Vũ hướng đến một cuộc
              sống năng động, tích cực hơn.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
