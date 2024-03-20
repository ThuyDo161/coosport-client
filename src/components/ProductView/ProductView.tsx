import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addItem } from "../../redux/reducer/cartItems.slide";
import { productInterface, remove } from "../../redux/reducer/products.slice";
import numberWithCommas, {
  messageError,
  messageSuccess,
} from "../../utils/GlobalFunction";
import Button from "../Button/Button";
import "./product.scss";
import { Box } from "@mantine/core";

const ProductView = (props: ProductViewPropTypes) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const productValue = useAppSelector((state) => state.productModal.valueModal);

  let product = props.product?.find(
    (item) => item.product_id === (id || productValue)
  );

  const [previewImg, setPreviewImg] = useState(product?.img[0]);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState<string>("");

  const [size, setSize] = useState<string>("");

  const [quantity, setQuantity] = useState(1);

  const history = useNavigate();

  const productColor = useRef<{ color: string; disabled: boolean }[]>(
    Array.from(
      new Set(
        props.product?.map((item) => ({
          color: item.color_code,
          disabled: false,
        }))
      )
    ).reduce((a: any[], c) => {
      !a.find((v) => v.color === c.color) && a.push(c);
      return a;
    }, [])
  );
  const productSize = useRef<{ size: string; disabled: boolean }[]>(
    Array.from(
      new Set(
        props.product?.map((item) => ({
          size: item.sizename as string,
          disabled: false,
        }))
      )
    ).reduce((a: any[], c) => {
      !a.find((v) => v.size === c.size) && a.push(c);
      return a;
    }, [])
  );

  const productImg = useRef<{ img: string[]; name: string }[]>([]);

  let productCount: number | undefined = useRef<number | undefined>(0).current;
  ((size: string, color: string) => {
    if (size && color) {
      productCount = props.product?.reduce((total, item) => {
        if (item.sizename === size && item.color_code === color)
          total += parseInt(item.count);
        return total;
      }, 0);
    } else if (size || color) {
      productCount = props.product?.reduce((total, item) => {
        if (item.sizename == size) total += parseInt(item.count);
        if (item.color_code == color) total += parseInt(item.count);
        return total;
      }, 0);
    } else {
      productCount = props.product?.reduce(
        (total, item) => total + parseInt(item.count),
        0
      );
    }
  })(size, color);

  const updateQuantity = (type: "plus" | "minus") => {
    if (productCount === 0) {
      return;
    } else if (type === "plus") {
      setQuantity(quantity + 1 > productCount! ? productCount! : quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    if (product) {
      setPreviewImg(product!.img[0]);
      setQuantity(1);
      setColor("");
      setSize("");
      productColor.current = Array.from(
        new Set(
          props.product?.map((item) => ({
            color: item.color_code,
            disabled: false,
          }))
        )
      ).reduce((a: any[], c) => {
        !a.find((v) => v.color === c.color) && a.push(c);
        return a;
      }, []);
      productSize.current = Array.from(
        new Set(
          props.product?.map((item) => ({
            size: item.sizename as string,
            disabled: false,
          }))
        )
      ).reduce((a: any[], c) => {
        !a.find((v) => v.size === c.size) && a.push(c);
        return a;
      }, []);

      productImg.current =
        props.product?.map((item) => ({
          img: item.img,
          name: item.productname,
        })) || [];
    }
  }, [product]);

  useEffect(() => {
    const productColor = props.product?.filter(
      (item) => item.color_code === color
    );
    setPreviewImg(productColor?.[0]?.img[0] || product?.img[0]);
  }, [color]);

  const check = () => {
    if (color === "") {
      alert("Vui lòng chọn màu sắc!");
      return false;
    }

    if (size === "") {
      alert("Vui lòng chọn kích cỡ!");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) {
      const newItem = {
        slug: product!.product_slug,
        color: color,
        size: size,
        parentId: product!.product_id,
        id_product: props.product?.find(
          (item) => item.sizename === size && item.color_code === color
        )?.product_id,
        price: product!.pricesell,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        messageSuccess("Thêm sản phẩm vào giỏ hàng thành công");
      } else {
        messageError("Thêm vào giỏ hàng thất bại");
      }
    }
  };

  const goToCart = () => {
    if (check()) {
      const newItem = {
        slug: product!.product_slug,
        color: color,
        size: size,
        parentId: product!.product_id,
        id_product: props.product?.find(
          (item) => item.sizename === size && item.color_code === color
        )?.product_id,
        price: product!.pricesell,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        dispatch(remove());
        history("/cart");
      } else {
        alert("Fail");
      }
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          {productImg.current.map((prd) =>
            prd.img.map((img) => (
              <div
                className="product__images__list__item"
                onClick={() => setPreviewImg(img)}
              >
                <img src={img} alt={prd.name} />
              </div>
            ))
          )}
        </div>
        <div className="product__images__main">
          <img src={previewImg || ""} alt={product?.productname} />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product?.productname}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product?.pricesell ?? 0)} VNĐ
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng hiện có</div>
          <span className="product__info__item__count">
            {numberWithCommas(productCount ?? 0) != "0" ? (
              numberWithCommas(productCount ?? 0)
            ) : (
              <span className="product__info__item__count--over">Hết Hàng</span>
            )}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {productColor.current!.map((item, index: number) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item.color ? "active" : ""
                } ${item.disabled && "disabled"}`}
                onClick={() => {
                  if (color === item.color) {
                    productSize.current! = Array.from(
                      new Set(
                        props.product?.map((prd) => ({
                          size: prd.sizename as string,
                          disabled: false,
                        }))
                      )
                    ).reduce((a: any[], c) => {
                      !a.find((v) => v.size === c.size) && a.push(c);
                      return a;
                    }, []);
                    setColor("");
                  } else {
                    let activeArr = props.product
                      ?.filter((product) => product.color_code === item.color)
                      .map((prd) => prd.sizename as string);
                    productSize.current! = Array.from(
                      new Set(
                        props.product?.map((prd) => ({
                          size: prd.sizename as string,
                          disabled: !activeArr?.includes(
                            prd.sizename as string
                          ),
                        }))
                      )
                    ).reduce((a: any[], c) => {
                      !a.find((v) => v.size === c.size) && a.push(c);
                      return a;
                    }, []);
                    setColor(item.color);
                  }
                }}
              >
                <Box
                  className="circle"
                  sx={{ backgroundColor: item.color }}
                ></Box>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {productSize.current.map((item, index: number) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item.size ? "active" : ""
                } ${item.disabled && "disabled"}`}
                onClick={() => {
                  if (size === item.size) {
                    productColor.current! = Array.from(
                      new Set(
                        props.product?.map((prd) => ({
                          color: prd.color_code,
                          disabled: false,
                        }))
                      )
                    ).reduce((a: any[], c) => {
                      !a.find((v) => v.color === c.color) && a.push(c);
                      return a;
                    }, []);
                    setSize("");
                  } else {
                    let activeArr = props.product
                      ?.filter((product) => product.sizename === item.size)
                      .map((prd) => prd.color_code);
                    productColor.current! = Array.from(
                      new Set(
                        props.product?.map((prd) => ({
                          color: prd.color_code,
                          disabled: !activeArr?.includes(prd.color_code),
                        }))
                      )
                    ).reduce((a: any[], c) => {
                      !a.find((v) => v.color === c.color) && a.push(c);
                      return a;
                    }, []);
                    setSize(item.size);
                  }
                }}
              >
                <span className="product__info__item__list__item__size">
                  {item.size}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button disabled={!productCount} onClick={() => addToCart()}>
            thêm vào giỏ
          </Button>
          <Button disabled={!productCount} onClick={() => goToCart()}>
            mua ngay
          </Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

type ProductViewPropTypes = {
  product: productInterface[] | undefined;
};

export default ProductView;
