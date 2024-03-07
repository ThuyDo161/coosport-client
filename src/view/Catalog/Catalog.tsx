import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Helmet from "../../components/Helmet/Helmet";
import InfinityList from "../../components/InfinityList/InfinityList";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getProducts,
  productsBySlug,
} from "../../redux/reducer/products.slice";
import "./catalog.scss";

type initFilterTYpe = {
  category: any[];
  color: string[];
  size: string[];
  brand: string[];
};

const Catalog = () => {
  const initFilter: initFilterTYpe = {
    category: [],
    color: [],
    size: [],
    brand: [],
  };

  const { slug } = useParams();
  const navigate = useNavigate();

  const productList = useAppSelector((state) => state.productModal.allProduct);
  const categoryList = useAppSelector((state) => state.category.category);
  const BrandList = useAppSelector((state) => state.brands.brand);
  const [filter, setFilter] = useState(initFilter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    slug === undefined && dispatch(getProducts());
  }, [slug === undefined]);
  useEffect(() => {
    dispatch(productsBySlug(slug));
  }, [slug]);

  const filterSelect = (type: string, checked: boolean, item: any) => {
    // if (checked) {
    //     switch(type) {
    //         case "CATEGORY":
    //             setFilter({...filter, category: [...filter.category, item.categorySlug]})
    //             break
    //         case "COLOR":
    //             setFilter({...filter, color: [...filter.color, item.color]})
    //             break
    //         case "SIZE":
    //             setFilter({...filter, size: [...filter.size, item.size]})
    //             break
    //         default:
    //     }
    // } else {
    //     switch(type) {
    //         case "CATEGORY":
    //             const newCategory = filter.category.filter(e => e !== item.categorySlug)
    //             setFilter({...filter, category: newCategory})
    //             break
    //         case "COLOR":
    //             const newColor = filter.color.filter(e => e !== item.color)
    //             setFilter({...filter, color: newColor})
    //             break
    //         case "SIZE":
    //             const newSize = filter.size.filter(e => e !== item.size)
    //             setFilter({...filter, size: newSize})
    //             break
    //         default:
    //     }
    // }
  };

  // const clearFilter = () => setFilter(initFilter);
  const clearFilter = () => navigate("/catalog", { replace: true });

  const updateProducts = useCallback(() => {
    // let temp = productList
    // if (filter.category.length > 0) {
    //     temp = temp.filter(e => filter.category.includes(e.categorySlug))
    // }
    // if (filter.color.length > 0) {
    //     temp = temp.filter(e => {
    //         const check = e.colors.find(color => filter.color.includes(color))
    //         return check !== undefined
    //     })
    // }
    // if (filter.size.length > 0) {
    //     temp = temp.filter(e => {
    //         const check = e.size.find(size => filter.size.includes(size))
    //         return check !== undefined
    //     })
    // }
    // setProducts(temp)
  }, [filter, productList]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef<HTMLDivElement>(null);

  const showHideFilter = () => filterRef?.current!.classList.toggle("active");

  return (
    <Helmet title="Sản phẩm">
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
                  {/* <CheckBox
                    label={item.categoryname}
                    onChange={(input) =>
                      filterSelect("CATEGORY", input!.checked, item)
                    }
                    checked={filter.category.includes(item.category_slug)}
                  /> */}
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
                  {/* <CheckBox
                    label={item.brandname}
                    onChange={(input) =>
                      filterSelect("BRAND", input!.checked, item)
                    }
                    checked={filter.brand.includes(item.brand_slug)}
                  /> */}
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
          <InfinityList data={productList} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
