import React, { useEffect, useState } from "react";
import productData, { ProductType } from "../../assets/fake-data/products";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getProductDetail,
  productInterface,
  remove,
} from "../../redux/reducer/products.slice";
import { getProductBySlug } from "../../utils/GlobalFunction";
import Button from "../Button/Button";
import ProductView from "../ProductView/ProductView";
import "./product-view-modal.scss";

const ProductViewModal = () => {
  const productSlug = useAppSelector((state) => state.productModal.valueModal);
  const productStore = useAppSelector((state) => state.productModal.allProduct);
  const productDetail = useAppSelector(
    (state) => state.productModal.productDetail
  );
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<productInterface | undefined>(
    undefined
  );

  useEffect(() => {
    if (productSlug) {
      dispatch(getProductDetail(productSlug));
    }
    setProduct(getProductBySlug(productStore, productSlug));
  }, [productSlug]);
  if (!productDetail.length) return null;
  return (
    <div
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        <ProductView product={productDetail} />
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
