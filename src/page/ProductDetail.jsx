import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/wonjiyang/fashion/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProduct(data);
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div className="detail-sec">
      <div className="detail-img-sec">
        <img alt="detail" className="detail-img" src={product?.img} />
      </div>
      <div className="detail-content">
        <div className="detail-title">{product?.title}</div>
        <div className="detail-price">₩ {product?.price}</div>
        <div className="detail-color">컬러: {product?.color}</div>{' '}
        <img
          alt="detail"
          className="detail-color-img"
          src={product?.hoverImg}
        />
        <Button className="detail-similar">비슷한 아이템 보기</Button>
        <div className="detail-size">
          {product?.size?.map((s, index) => (
            <button
              key={index}
              className={`size ${
                index === product.size.length - 1 ? 'size-last' : ''
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <Button className="detail-similar">사이즈 가이드</Button>
        <Button className="detail-btn" variant="dark" type="submit">
          추가
        </Button>
      </div>
    </div>
  );
}

export default ProductDetail;
