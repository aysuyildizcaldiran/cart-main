import './App.css'
import data from './assets/data.json';
import { useState } from 'react';
import ModalComponent from './components/ModalComponent';
import CartComponent from './components/CartComponent';
import ProductsComponent from './components/ProductsComponent';

function App() {
  const [cartCounts, setCartCounts] = useState<{ [key: number]: number }>({});
  const productCount = Object.values(cartCounts).filter((count) => count > 0).length;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrease = (index: number) => {
    setCartCounts(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
  };

  const handleDecrease = (index: number) => {
    setCartCounts(prev => ({
      ...prev,
      [index]: Math.max((prev[index] || 0) - 1, 0)
    }));
  };

  return (
    <div className="main-container">
      <ProductsComponent data={data} cartCounts={cartCounts} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
      <CartComponent cartCounts={cartCounts} data={data} setCartCounts={setCartCounts} productCount={productCount} setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <ModalComponent open={isModalOpen} onClose={() => setIsModalOpen(false)} cartCounts={cartCounts} data={data} />
      )}
    </div>
  );
}

export default App;
