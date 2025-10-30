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
      const searchQuery = query.get('q')?.toLowerCase() || '';
      const response = await fetch('/products.json');
      if (!response.ok) throw new Error('상품 데이터를 불러올 수 없습니다.');
      const data = await response.json();
      const filtered = data.products.filter((item) =>
        item.title.toLowerCase().includes(searchQuery)
      );
      if (filtered.length === 0) setError('검색 결과가 없습니다.');
      setProductList(filtered);
    } catch (err) {
      console.error(err);
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
        <div className="no-result">{error}</div>
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
