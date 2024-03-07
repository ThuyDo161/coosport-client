import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {set} from '../../redux/reducer/products.slice';
import numberWithCommas from '../../utils/GlobalFunction';
import Button from '../Button/Button';
import './product-card.scss';

type ProductCardPropTypes = {
  id: string;
  img01: string | null;
  img02: string | null;
  name: string;
  price: number;
  slug: string;
};
const ProductCard = (props: ProductCardPropTypes) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <Link to={`/product/${props.id}`}>
        <div className="product-card__image">
          <img src={props.img01 ?? ''} alt="" />
          <img src={props.img02 || props.img01 || ''} alt="" />
        </div>
        <h3 className="product-card__name">{props.name}</h3>
        <div className="product-card__price">
          {numberWithCommas(props.price)}
          <span className="product-card__price__old">
            <del>{numberWithCommas(props.price + 50000)}</del>
          </span>
          VNĐ
        </div>
      </Link>
      <div className="product-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => dispatch(set(props.id))}
        >
          chọn mua
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
