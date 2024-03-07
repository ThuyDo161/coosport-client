import { Title } from "@mantine/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Helmet from "../../components/Helmet/Helmet";
import InfinityList from "../../components/InfinityList/InfinityList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getProducts, productSearch } from "../../redux/reducer/products.slice";
import "./search-page.scss";

type initFilterTYpe = {
  category: string[];
  color: string[];
  size: string[];
  brand: string[];
};

const SearchPage = () => {
  const initFilter: initFilterTYpe = {
    category: [],
    color: [],
    size: [],
    brand: [],
  };

  const { key } = useParams();
  console.log(key);

  const navigate = useNavigate();

  const productList = useAppSelector(
    (state) => state.productModal.searchProduct
  );
  const categoryList = useAppSelector((state) => state.category.category);
  const BrandList = useAppSelector((state) => state.brands.brand);
  const [filter, setFilter] = useState(initFilter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    key === undefined && dispatch(getProducts());
  }, [key === undefined]);
  useEffect(() => {
    dispatch(productSearch(key));
  }, [key]);

  const clearFilter = () => navigate("/catalog", { replace: true });

  const filterRef = useRef<HTMLDivElement>(null);

  const showHideFilter = () => filterRef?.current!.classList.toggle("active");

  return (
    <Helmet title="Tìm kiếm Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {categoryList.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "link-active" : ""
                    }
                    to={`/catalog/${item.category_slug}`}
                  >
                    {item.categoryname}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">thương hiệu</div>
            <div className="catalog__filter__widget__content">
              {BrandList.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "link-active" : ""
                    }
                    to={`/catalog/${item.brand_slug}`}
                  >
                    {item.brandname}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          {productList.length && <Title order={1} align="center" sx={{ marginBottom: 20 }}>
            Kết quả tìm kiếm: {key}
          </Title>}

          {!productList.length && <Title order={1} align="center" sx={{ marginBottom: 20 }}>
            Kết quả tìm kiếm: Không tìm thấy sản phẩm với từ khóa "{key}"
          </Title>}
          <InfinityList data={productList} />
        </div>
      </div>
    </Helmet>
  );
};

export default SearchPage;
