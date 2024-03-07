import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { removeItem, updateItem } from "../../redux/reducer/cartItems.slide";
import numberWithCommas from "../../utils/GlobalFunction";
import "./cart-item.scss";

type CartItemPropTypes = {
  item: any;
  hiddenControl?: boolean;
};

const CartItem = (props: CartItemPropTypes) => {
  const dispatch = useAppDispatch();

  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt: string) => {
    if (opt === "+") {
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
    }
    if (opt === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 })
      );
    }
  };

  const removeCartItem = () => {
    console.log("removeCartItem");
    dispatch(removeItem(item));
  };

  return (
    <div className="cart__item" ref={itemRef}>
      <div className="cart__item__image">
        <img src={item.img[0] || ""} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/product/${item.parentId}`}>
            {`${item.title} - ${item.color} - ${item.size}`}
          </Link>
        </div>
        <div className="cart__item__info__price">
          Giá: {numberWithCommas(item.price)}
        </div>
        {props.hiddenControl ? (
          <div className="cart__item__info__quantity">
            <div className="product__info__item__quantity">
              Số lượng: {quantity}
            </div>
          </div>
        ) : (
          <div className="cart__item__info__quantity">
            <div className="product__info__item__quantity">
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("-")}
              >
                <i className="bx bx-minus"></i>
              </div>
              <div className="product__info__item__quantity__input">
                {quantity}
              </div>
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("+")}
              >
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </div>
        )}

        <div className="cart__item__info__price">
          {`Tổng:  ${numberWithCommas(item.price * quantity)} VNĐ`}
        </div>
        {props.hiddenControl ? null : (
          <div className="cart__item__del">
            <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
