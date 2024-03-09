import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import Helmet from "../../components/Helmet/Helmet";
import HeroSlider from "../../components/HeroSlide/HeroSlide";
import PolicyCard from "../../components/PolicyCard/PolicyCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/Section/Section";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getBanners } from "../../redux/reducer/banners.slice";
import { getSlides } from "../../redux/reducer/hero-slide.slice";
import { getPolicies } from "../../redux/reducer/policy.slice";
import {
  getProducts,
  productInterface,
} from "../../redux/reducer/products.slice";
import { getRandomProducts } from "../../utils/GlobalFunction";

const Home = () => {
  const heroSliderStore = useAppSelector((state) => state.heroSlideData.slide);
  const bannerStore = useAppSelector((state) => state.banners.banner);
  const policyStore = useAppSelector((state) => state.policy.policy);
  const productStore = useAppSelector((state) => state.productModal.allProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productStore.length) dispatch(getProducts());
    dispatch(getSlides());
    dispatch(getBanners());
    dispatch(getPolicies());
  }, []);

  return (
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderStore}
        control={true}
        auto={true}
        timeOut={5000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policyStore.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {getRandomProducts(productStore, 8).map((item, index) => (
              <ProductCard
                key={index}
                id={item.product_id}
                img01={item.img[0] || null}
                img02={item.img[1] || null}
                name={item.productname}
                price={Number(item.pricesell)}
                slug={item.product_slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end new arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          <CCarousel indicators interval={3000}>
            {bannerStore.map((item) => (
              <CCarouselItem key={item.id}>
                <CImage
                  className="d-block w-100 box-shadow banner-item"
                  src={item.img}
                  alt={item.title}
                />
              </CCarouselItem>
            ))}
          </CCarousel>
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* popular product section */}
      <Section>
        <SectionTitle>phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {getRandomProducts(productStore, 12).map(
              (item: productInterface, index) => (
                <ProductCard
                  key={index}
                  id={item.product_id}
                  img01={item.img[0]}
                  img02={item.img[1]}
                  name={item.productname}
                  price={Number(item.pricesell)}
                  slug={item.product_slug}
                />
              )
            )}
          </Grid>
        </SectionBody>
      </Section>
      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
