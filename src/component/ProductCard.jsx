import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ item }) {
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const showDetail = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div onClick={showDetail}>
      <img
        className="img"
        src={hovered ? item?.hoverImg : item?.img}
        alt={item?.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className="item-title">
        <div className="choice">
          {item?.choice === true ? 'Conscious choice' : ''}
        </div>
        <div>{item?.title}</div>
        <div className="price">₩{item?.price}</div>
        <div className="new">{item?.new === true ? '신제품' : ''}</div>
      </div>
    </div>
  );
}

export default ProductCard;
