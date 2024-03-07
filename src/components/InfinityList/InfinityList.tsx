import React, {useEffect, useRef, useState} from 'react';
import {productInterface} from '../../redux/reducer/products.slice';
import Grid from '../Grid/Grid';
import ProductCard from '../ProductCard/ProductCard';

type InfinityListPropTypes = {
  data: productInterface[];
};

const InfinityList = (props: InfinityListPropTypes) => {
  const perLoad = 6; // items each load

  const listRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<productInterface[]>([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index: number) => (
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
    </div>
  );
};

export default InfinityList;
