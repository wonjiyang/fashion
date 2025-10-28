import React from 'react';

function ProductCard({ item }) {
  return (
    <div>
      <img className="img" src={item?.img} alt="" />
      <div>{item?.choice == true ? 'Conscious choice' : ''}</div>
      <div>{item?.title}</div>
      <div>₩{item?.price}</div>
      <div>{item?.new == true ? '신제품' : ''}</div>
    </div>
  );
}

export default ProductCard;
