import { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function ProductAll() {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const searchQuery = query.get('q') || '';
      const url = `http://localhost:5000/products?q=${searchQuery}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        setError('검색 결과가 없습니다.');
      } else {
        setProductList(data);
      }
    } catch (err) {
      console.error('상품 데이터를 불러오는 중 오류 발생:', err);
      setError('상품 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div className="item-area">
      {loading ? (
        <p className="loading-text">로딩 중...</p>
      ) : error ? (
        <div className="no-result">
          <p>{error}</p>
        </div>
      ) : (
        <Row>
          {productList.map((menu) => (
            <Col key={menu.id} lg={3}>
              <ProductCard item={menu} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ProductAll;
