import React from 'react';
import ProductCart from './ProductCart';

interface ProductsComponentProps {
  data: any[];
  cartCounts: { [key: number]: number };
  handleIncrease: (index: number) => void;
  handleDecrease: (index: number) => void;
}

const ProductsComponent: React.FC<ProductsComponentProps> = ({ data, cartCounts, handleIncrease, handleDecrease }) => (
  <div className="products-container">
    <h1>Desserts</h1>
    <div className="products-grid">
      {data.map((item, index) => (
        <ProductCart
          key={index}
          urun={item}
          index={index}
          cartCounts={cartCounts}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      ))}
    </div>
  </div>
);

export default ProductsComponent; 