import React from "react";
import { useParams } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import Helmet from "../../components/Helmet/Helmet";
import NotFound from "../../components/NotFound/NotFound";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductView from "../../components/ProductView/ProductView";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/Section/Section";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getProductDetail,
  getProducts,
} from "../../redux/reducer/products.slice";
import { getRandomProducts } from "../../utils/GlobalFunction";

const Product = () => {
  const { id } = useParams();
  const productStore = useAppSelector((state) => state.productModal.allProduct);
  const productDetail = useAppSelector(
    (state) => state.productModal.productDetail
  );

  const product = productDetail.find((item) => item.product_id === id);
  const dispatch = useAppDispatch();

  const relatedProducts = getRandomProducts(productStore, 8);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductDetail(id));
    dispatch(getProducts());
  }, [id]);

  if (!product) {
    return <NotFound />;
  }

  return (
    <Helmet title={product?.productname}>
      <Section>
        <SectionBody>
          <ProductView product={productDetail} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                id={item.product_id}
                img01={item.img[0]}
                img02={item.img[1]}
                name={item.productname}
                price={Number(item.pricesell)}
                slug={item.product_slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
