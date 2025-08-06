import React from 'react';

interface ProductCartProps {
  urun: {
    name: string;
    category: string;
    price: number;
    image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
  };
  index: number;
  cartCounts: { [key: number]: number };
  handleIncrease: (index: number) => void;
  handleDecrease: (index: number) => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ urun, index, cartCounts, handleIncrease, handleDecrease }) => (
  <div className="urun-karti">
    <div className="urun-resim-container">
      <img
        src={urun.image.desktop}
        alt={urun.name}
        className={`urun-resim ${cartCounts[index] > 0 ? 'active-border' : ''}`}
      />
    </div>
    <div className={`urun-action-bar ${cartCounts[index] > 0 ? 'active' : ''}`}>
      {cartCounts[index] > 0 ? (
        <>
          <button className="action-button" onClick={() => handleDecrease(index)}>
            <img src='/images/icon-decrement-quantity.svg' className="action-icon" />
          </button>
          <span className="action-count">{cartCounts[index]}</span>
          <button className="action-button" onClick={() => handleIncrease(index)}>
            <img src='/images/icon-increment-quantity.svg' className="action-icon" />
          </button>
        </>
      ) : (
        <button className="add-to-cart-button" onClick={() => handleIncrease(index)}>
          <img src="/images/icon-add-to-cart.svg" alt="add-to-cart" className="action-add-icon" />
          <span className="add-to-cart-text">Add to Cart</span>
        </button>
      )}
    </div>
    <div className="urun-bilgi">
      <span className="urun-category">{urun.category}</span>
      <span className="urun-ad">{urun.name}</span>
      <span className="urun-fiyat">{'$' + urun.price}</span>
    </div>
  </div>
);

export default ProductCart; 