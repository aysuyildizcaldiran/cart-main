
import './App.css'
import data from './assets/data.json';
import React, { useState } from 'react';

function App() {
  const [cartCounts, setCartCounts] = useState<{ [key: number]: number }>({});
  const productCount = Object.values(cartCounts).filter((count) => count > 0).length;
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const UrunKarti = ({
    urun,
    index
  }: {
    urun: { name: string; category: string; price: number; image: { thumbnail: string, mobile: string, tablet: string, desktop: string } },
    index: number
  }) => (
    <div style={styles.urunKarti}>
      <div
        style={styles.urunResimContainer}
      >
       <img
        src={urun.image.desktop}
        alt={urun.name}
        style={{
        ...styles.urunResim,
        borderColor: cartCounts[index] > 0 ? '#C83A0E' : 'transparent',
        borderStyle: 'solid',
        borderWidth: '2px',
  }}
/>
      </div>
      <div
        style={{
          ...styles.urunActionBar,
          backgroundColor: cartCounts[index] > 0 ? styles.urunActionBarActive.backgroundColor : styles.urunActionBar.backgroundColor,
          border :cartCounts[0] > 0 ? 'none' : '1px solid #C9C3BF'
        }}
      >
        {cartCounts[index] > 0 ? (
          <>
            <button style={styles.actionButton} onClick={() => handleDecrease(index)}>
              <img src='/images/icon-decrement-quantity.svg' style={styles.actionIcon} />
            </button>
            <span style={styles.actionCount}>{cartCounts[index]}</span>
            <button style={styles.actionButton} onClick={() => handleIncrease(index)}>
              <img src='/images/icon-increment-quantity.svg' style={styles.actionIcon} />
            </button>
          </>
        ) : (
          <button style={styles.addToCartButton} onClick={() => handleIncrease(index)}>
            <img src="/images/icon-add-to-cart.svg" alt="add-to-cart" style={styles.actionAddIcon} />
            <span style={styles.addToCartText}>Add to Cart</span>
          </button>
        )}
      </div>
      <div style={styles.urunBilgi}>
        <span style={styles.urunCategory}>{urun.category}</span>
        <span style={styles.urunAd}>{urun.name}</span>
        <span style={styles.urunFiyat}>{'$' + urun.price}</span>
      </div>
    </div>
  );

  const BasketComponent = ({ item, count, onRemove }: { item: any, count: number, onRemove: () => void }) => {
    return (
      <div style={styles.basketRow}>
        <div style={styles.basketInfo}>
          <span>{item.name}</span>
          <span style={{marginTop:5}}>
            <span style={{color:'#C83A0E'}}>{count}x</span>
            <span style={{color:'#C9C3BF'}}> @ ${item.price}</span>
          </span>
        </div>
        <button style={styles.basketRemoveButton} onClick={onRemove}>
          <img src="/images/icon-remove-item.svg" alt="order-confirmed" style={styles.actionIcon} />
        </button>
      </div>
    );
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.productsContainer}>
      <h1 style={{alignSelf:'flex-start',padding:'0 0 10px 0'}}>Desserts</h1>
        <div style={styles.urunlerGrid}>
          {data.map((item, index) => (
            <UrunKarti key={index} urun={item} index={index} />
          ))}
        </div>
      </div>
      <div style={styles.cartContainer}>
        <div style={styles.cartUrunBilgi}>
          <span style={styles.cartUrunAd}>Your Cart ({productCount})</span>
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
              <div style={styles.orderTotalRow}>
                <span>Order Total</span>
                <span style={{fontSize:16,fontWeight:'bold'}}>${Object.entries(cartCounts).filter(([_, count]) => count > 0).reduce((total, [index, count]) => total + data[Number(index)].price * count, 0).toFixed(2)}</span>
              </div>
              <div style={styles.carbonNeutralInfo}>
                <img src="/images/icon-carbon-neutral.svg" alt="order-confirmed" style={styles.actionAddIcon} />
                <span>This is a carbon-neutal delivery</span>
              </div>
              <button style={styles.confirmOrderButton} onClick={() => setIsModalOpen(true)}>
                <span style={styles.confirmOrderButtonText}>Confirm Order</span>
              </button>
            </>
          ) : 
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', marginTop:20}}>
              <img src="/images/illustration-empty-cart.svg" alt="empty-cart" style={{width:120, marginBottom:16}} />
              <span style={{color:'#888', fontSize:15}}>Your added items will appear here</span>
            </div>
          }
        </div>
      </div>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 32,
              minWidth: 400,
              maxWidth: 470,
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              
            }}>
          
            <img src="/images/icon-order-confirmed.svg" alt="order-confirmed" style={styles.actionAddIcon} />
            <h2 style={{marginBottom: 5}}>Order Confirmed</h2>
            <span style={{fontSize: 12,color:'#C9C3BF'}}>We hope you enjoy your food!</span>
            <div style={{backgroundColor:'#FCF8F5',padding:5}}>
            <ul style={{width:'100%', padding:0, margin:0, listStyle:'none',marginTop:20}}>
              {Object.entries(cartCounts).filter(([_, count]) => count > 0).map(([index, count]) => (
                <li key={index} style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12, gap:12}}>
                  <img src={data[Number(index)].image.desktop} alt={data[Number(index)].name} style={{width:48, height:48, borderRadius:8, objectFit:'cover', marginRight:8}} />
                  <div style={{display:'flex', flexDirection:'column', flex:1, alignItems:'flex-start'}}>
                    <span >{data[Number(index)].name}</span>
                    <span style={{marginTop:5}}>
                    <span style={{color:'#C83A0E', fontSize:14, marginTop:2}}>x{count}</span>
                    <span style={{color:'#C9C3BF',fontSize:13, }}>  ${data[Number(index)].price}</span>
                  </span>
                    
                  </div>
                  <span style={{}}>${(data[Number(index)].price * count).toFixed(2)}</span>
                </li>
              ))}
            </ul>
           
            <div style={{margin:'30px 5px 30px 0', width:'100%', display:'flex', justifyContent:'space-between',marginBottom:20}}>
              <span style={{fontSize:14}}>Order Total</span>
              <span>${Object.entries(cartCounts).filter(([_, count]) => count > 0).reduce((total, [index, count]) => total + data[Number(index)].price * count, 0).toFixed(2)}</span>
            </div>
            </div>
            <button onClick={() => setIsModalOpen(false)} style={{borderRadius:15,marginTop:8, padding:'10px 24px', border:'none', background:'#C83A0E', color:'white', fontWeight:'bold', cursor:'pointer'}}>Start New Order</button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FCF8F5',
    margin:40
  },
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    padding: 16,
  },
  urunlerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  urunKarti: {
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 0,
    gap: 8,
    width: 200,
    height: 300,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  urunResimContainer: {
    width: '100%',
    height: 190,
    overflow: 'visible',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
    borderColor:'#C83A0E'
  },
  urunResimContainerActive: {
    backgroundColor: 'blue',
  },
  urunResim: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 8,
  },
  urunActionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: '4px 8px',
    minWidth: 120,
    maxWidth: 120,
    position: 'absolute',
    bottom: 'calc(68% - 110px)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  },
  urunActionBarActive: {
    backgroundColor: '#C83A0E',
  },
  actionButton: {
    border: '1px solid white',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C83A0E',
    color: '#fff',
    fontSize: 15,
    cursor: 'pointer',
    padding: 0,
    outline: 'none',
  },
  actionIcon: {
    width: 12,
    height: 12,
  },
  actionAddIcon: {
    width: 24,
    height: 24,
  },
  actionCount: {
    color: 'white',
    fontSize: 13,
  },
  addToCartButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    margin: '0 auto',
  },
  addToCartText: {
    color: 'black',
    fontSize: 14,
  },
  urunBilgi: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '20px 4px',
    gap: 2,
  },
  urunCategory: {
    color: '#888',
    fontWeight: 500,
    fontSize: 13,
    marginBottom: 2,
    textAlign: 'left',
  },
  urunAd: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'left',
    paddingBottom: 5,
  },
  urunFiyat: {
    color: '#C83A0E',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    paddingBottom: 5,
  },
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
  height: 'fit-content',
    width: '30%', 
    alignItems: 'flex-start',
    padding: 24,
    backgroundColor:'white',
    margin:'40px 0px 0px 0px',
    borderRadius:20,
  },
  cartUrunBilgi: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    width:'90%'
  },
  cartUrunAd: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
    color:'#C83A0E'
  },
  cartUrunFiyat: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  basketRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    marginBottom: 8,
    padding: 8,
    width:'100%',
    borderBottom: '1px solid #eee',
  },
  basketInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 2,
    color: 'black',
    padding: 4,
    borderRadius: 4,
    alignItems: 'flex-start',
   
  },
  basketRemoveButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 4,
    border: '1px solid #C9C3BF',
    width:24,
    height:24,
    borderRadius:'50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTotalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  carbonNeutralInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  confirmOrderButton: {
    backgroundColor: '#C83A0E',
    border: 'none',
    padding: 20,
    borderRadius: 30,
    width: '100%',
    marginTop: 10,
  },
  confirmOrderButtonText: {
    color: 'white',
    fontSize: 15,
  },
} as const;

export default App
