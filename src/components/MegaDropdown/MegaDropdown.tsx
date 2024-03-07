import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {getBrands} from '../../redux/reducer/brand.slice';
import {
  getCategories,
} from '../../redux/reducer/category.slice';
import Grid from '../Grid/Grid';
import './mega-dropdown.scss';

const MegaDropdown = () => {
  const categoryStore = useAppSelector((state) => state.category.category);
  const brandsStore = useAppSelector((state) => state.brands.brand);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  return (
    <div className="mega-content">
      <Grid col={4} mdCol={1} smCol={1} gap={10}>
        <div className="box">
          <h3>Loại sản phẩm</h3>
          <ul>
            {categoryStore.map((category, i) => (
              <li key={i}>
                <Link to={`/catalog/${category.category_slug}`}>
                  {category.categoryname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="box">
          <h3>Thương hiệu nổi tiếng</h3>
          <ul>
            {brandsStore.map((brand, i) => (
              <li key={i}>
                <Link to={`/catalog/${brand.brand_slug}`}>
                  {brand.brandname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    </div>
  );
};

export default MegaDropdown;
