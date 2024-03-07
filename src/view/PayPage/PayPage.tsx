import { Box, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import Helmet from "../../components/Helmet/Helmet";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { clearCart, payBill } from "../../redux/reducer/cartItems.slide";
import { getProducts } from "../../redux/reducer/products.slice";
import { getUser } from "../../redux/reducer/user.slice";
import numberWithCommas, {
  getCartItemsInfo,
  messageError,
  messageSuccess,
} from "../../utils/GlobalFunction";
import "./pay-page.scss";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartItems.value);
  const productStore = useAppSelector((state) => state.productModal.allProduct);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState<any>([]);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const form = useForm({
    initialValues: {
      name: user?.name || "",
      address: user?.address || "",
      tel: user?.user_tel || "",
    },

    validate: {
      name: (value: string) =>
        !value ? "Không được để trống tên người nhận!" : null,
      address: (value: string) =>
        !value ? "Không được để trống địa chỉ nhận hàng!" : null,
      tel: (value: string) =>
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
          value
        )
          ? null
          : "Số điện thoại không đúng định dạng! Vui lòng nhập lại!",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const items = cartItems.map((item: any) => ({
      id: item.id_product,
      quantity: item.quantity,
    }));

    const value = {
      user_id: user?.user_id ?? "",
      name: values?.name !== user?.name ? values?.name : "",
      tel: values?.tel !== user?.user_tel ? values?.tel : "",
      location: values?.address !== user?.address ? values?.address : "",
    };
    const payload = {
      ...value,
      items,
    };
    dispatch(payBill(payload))
      .unwrap()
      .then((res) => {
        if (res.code === 200) {
          messageSuccess(res.success);
          dispatch(clearCart())
          navigate("/", { replace: true });
        } else messageError(res.error);
      });
  };

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

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Helmet title="Thông tin đơn hàng">
      <div className="pay">
        <div className="pay__title">Thông tin đơn hàng</div>
        <div className="pay__info">
          <Box sx={{ maxWidth: "80%" }} mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Tên người nhận"
                required
                size="lg"
                placeholder="Name"
                {...form.getInputProps("name")}
              />
              <TextInput
                size="lg"
                label="Địa chỉ nhận hàng"
                required
                placeholder="Address"
                {...form.getInputProps("address")}
              />
              <TextInput
                size="lg"
                label="Số điện thoại người nhận"
                placeholder="Telephone"
                required
                {...form.getInputProps("tel")}
              />
              <div className="pay__info__txt">
                {!user?.name ? (
                  <p>
                    Bạn đã có tài khoản vui lòng{" "}
                    <Link to="/login">Đăng nhập</Link>
                  </p>
                ) : null}

                <div className="pay__info__txt__price">
                  <span>Tổng tiền:</span>{" "}
                  <span>{numberWithCommas(Number(totalPrice))} VNĐ</span>
                </div>
              </div>
              <div className="pay__info__btn">
                <Link to="/cart">
                  <Button size="block">Quay lại giỏ hàng</Button>
                </Link>
                <span>
                  <Button type="submit" size="block">
                    Xác nhận đặt hàng
                  </Button>
                </span>
              </div>
            </form>
          </Box>
        </div>
        <div className="pay__title pay__title--info">Thông tin hàng</div>
        <div className="pay__list">
          {cartProducts.map((item: any, index: number) => (
            <CartItem item={item} key={index} hiddenControl />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
