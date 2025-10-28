import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';

function ProductAll() {
  const [productList, setProductList] = useState([]);
  const getProducts = async () => {
    let url = `http://localhost:5000/products`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="item-area">
      <Row>
        {productList.map((menu) => (
          <Col lg={3}>
            <ProductCard item={menu} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductAll;
