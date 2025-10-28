import React from 'react';

function ProductCard({ item }) {
  return (
    <div>
      <img className="img" src={item?.img} alt="" />
      <div className="item-title">
        <div className="choice">
          {item?.choice == true ? 'Conscious choice' : ''}
        </div>
        <div>{item?.title}</div>
        <div className="price">₩{item?.price}</div>
        <div>{item?.new == true ? '신제품' : ''}</div>
      </div>
    </div>
  );
}

export default ProductCard;
