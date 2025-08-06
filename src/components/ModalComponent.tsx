import React from 'react';

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  cartCounts: { [key: number]: number };
  data: any[];
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, cartCounts, data }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-overlay" onClick={e => e.stopPropagation()}>
        <img src="/images/icon-order-confirmed.svg" className="action-add-icon" />
        <h2>Order Confirmed</h2>
        <span className="modal-subtext">We hope you enjoy your food!</span>
        <div className="modal-order-summary">
          <ul>
            {Object.entries(cartCounts).filter(([_, count]) => count > 0).map(([index, count]) => (
              <li key={index}>
                <img src={data[Number(index)].image.desktop} />
                <div>
                  <span>{data[Number(index)].name}</span>
                  <span>
                    <span className="count">x{count}</span>
                    <span className="price"> ${data[Number(index)].price}</span>
                  </span>
                </div>
                <span>${(data[Number(index)].price * count).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="modal-total-row">
            <span>Order Total</span>
            <span>${Object.entries(cartCounts).filter(([_, count]) => count > 0).reduce((total, [index, count]) => total + data[Number(index)].price * count, 0).toFixed(2)}</span>
          </div>
        </div>
        <button className="modal-confirm-button" onClick={onClose}>Start New Order</button>
      </div>
    </div>
  );
};

export default ModalComponent; 