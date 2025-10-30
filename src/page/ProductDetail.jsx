import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async () => {
    let url = `http://localhost:5000/products/${id}`;
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
        <div className="detail-color">컬러: {product?.color}</div>
        <Button className="detail-similar">비슷한 아이템 보기</Button>
        <div className="detail-size">
          <button className="size">{product?.size[0]}</button>
          <button className="size">{product?.size[1]}</button>
          <button className="size">{product?.size[2]}</button>
          <button className="size">{product?.size[3]}</button>
          <button className="size">{product?.size[4]}</button>
          <button className="size">{product?.size[5]}</button>
          <button className="size size-last">{product?.size[6]}</button>
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
