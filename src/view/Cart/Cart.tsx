import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import Helmet from "../../components/Helmet/Helmet";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getProducts } from "../../redux/reducer/products.slice";
import numberWithCommas, { getCartItemsInfo } from "../../utils/GlobalFunction";
import "./cart.scss";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartItems.value);
  const productStore = useAppSelector((state) => state.productModal.allProduct);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [cartProducts, setCartProducts] = useState<any>([]);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!productStore.length) dispatch(getProducts());
    else {
      setCartProducts(getCartItemsInfo(productStore, cartItems));
      setTotalPrice(
        cartItems.reduce(
          (total: number, item: any) =>
            total + Number(item.quantity) * Number(item.price),
          0
        )
      );
      setTotalProducts(
        cartItems.reduce(
          (total: number, item: any) => total + Number(item.quantity),
          0
        )
      );
    }
  }, [cartItems, productStore]);

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))} VNĐ</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button
              size="block"
              onClick={() => navigate("/pay", { replace: true })}
            >
              Đặt hàng
            </Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts.map((item: any, index: number) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
