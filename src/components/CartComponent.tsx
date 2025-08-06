import React from 'react';

interface CartComponentProps {
  cartCounts: { [key: number]: number };
  data: any[];
  setCartCounts: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  productCount: number;
  setIsModalOpen: (open: boolean) => void;
}

const BasketComponent = ({ item, count, onRemove }: { item: any, count: number, onRemove: () => void }) => (
  <div className="basket-row">
    <div className="basket-info">
      <span>{item.name}</span>
      <span>
        <span className="count">{count}x</span>
        <span className="price"> @ ${item.price}</span>
      </span>
    </div>
    <button className="basket-remove-button" onClick={onRemove}>
      <img src="/images/icon-remove-item.svg" className="action-icon" />
    </button>
  </div>
);

const CartComponent: React.FC<CartComponentProps> = ({ cartCounts, data, setCartCounts, productCount, setIsModalOpen }) => {
  return (
    <div className="cart-container">
      <div className="cart-urun-bilgi">
        <span className="cart-urun-ad">Your Cart ({productCount})</span>
        {productCount > 0 ? (
          <>
            {Object.entries(cartCounts).filter(([_, count]) => count > 0).map(([index, count]) => (
                <BasketComponent
                  key={index}
                  item={data[Number(index)]}
                  count={count}
                  onRemove={() => setCartCounts(prev => ({ ...prev, [index]: 0 }))}
                />
              ))}
            <div className="order-total-row">
              <span>Order Total</span>
              <span>${Object.entries(cartCounts).filter(([_, count]) => count > 0).reduce((total, [index, count]) => total + data[Number(index)].price * count, 0).toFixed(2)}</span>
            </div>
            <div className="carbon-neutral-info">
              <img src="/images/icon-carbon-neutral.svg" className="action-add-icon" />
              <span>This is a carbon-neutal delivery</span>
            </div>
            <button className="confirm-order-button" onClick={() => setIsModalOpen(true)}>
              <span className="confirm-order-button-text">Confirm Order</span>
            </button>
          </>
        ) : (
          <div className="empty-cart-info">
            <img src="/images/illustration-empty-cart.svg" alt="empty-cart" />
            <span>Your added items will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent; 