import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProductDetail = async () => {
    try {
      const response = await fetch('/products.json');
      if (!response.ok) throw new Error('상품 데이터를 불러올 수 없습니다.');
      const data = await response.json();
      const detail = data.products.find((p) => p.id === Number(id));
      setProduct(detail || null);
    } catch (err) {
      console.error(err);
      setProduct(null);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  if (!product) return <p>상품 정보를 불러올 수 없습니다.</p>;

  return (
    <div className="detail-sec">
      <div className="detail-img-sec">
        <img alt="detail" className="detail-img" src={product.img} />
      </div>
      <div className="detail-content">
        <div className="detail-title">{product.title}</div>
        <div className="detail-price">₩ {product.price}</div>
        <div className="detail-color">컬러: {product.color}</div>
        <img alt="detail" className="detail-color-img" src={product.hoverImg} />
        <Button className="detail-similar">비슷한 아이템 보기</Button>
        <div className="detail-size">
          {product.size?.map((s, idx) => (
            <button
              key={idx}
              className={`size ${
                idx === product.size.length - 1 ? 'size-last' : ''
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <Button className="detail-similar">사이즈 가이드</Button>
        <Button className="detail-btn" variant="dark">
          추가
        </Button>
      </div>
    </div>
  );
}

export default ProductDetail;
