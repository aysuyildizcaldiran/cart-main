
import './App.css'
import data from './assets/data.json';
function App() {

  // Ürün kartı bileşeni
  const UrunKarti = ({ urun }: { urun: { name: string; category: string; price: number; image: { thumbnail: string, mobile: string, tablet: string, desktop: string } } }) => (
    <div style={styles.urunKarti}>
      <img src={urun.image.desktop} alt={urun.name} style={styles.urunResim} />
      <div style={styles.urunActionBar}>
        <button style={styles.actionButton}>+</button>
        <img src="/images/icon-add-to-cart.svg" alt="add-to-cart" style={styles.actionIcon} />
        <button style={styles.actionButton}>-</button>
      </div>
      <div style={styles.urunBilgi}>
        <span style={styles.urunCategory}>{urun.category}</span>
        <span style={styles.urunAd}>{urun.name}</span>
        <span style={styles.urunFiyat}>{'₺' + urun.price}</span>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.productsContainer}>
        <div style={styles.urunlerGrid}>
          {data.map((item, index) => (
            <UrunKarti key={index} urun={item} />
          ))}
        </div>
      </div>
      <div style={styles.cartContainer}>
        <div style={styles.cartUrunBilgi}>
          <span style={styles.cartUrunAd}>Örnek Ürün</span>
          <span style={styles.cartUrunFiyat}>₺99.99</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',

  },
 
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    backgroundColor: 'red',
    overflowY: 'auto', // Dikey scroll
    height: '100vh', // Tüm ekran yüksekliği
    padding: 16,
  },
  urunlerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 sütun
    gap: 16,
  },
  urunKarti: {
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 0,
    gap: 8,
  },
  urunResim: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 8,
    flex: 2,
  },
  urunActionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: '6px',
    margin: '0 0 8px 0',
  },
  actionButton: {
    border: 'none',
    borderRadius: 20,
    padding: '4px 12px',
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
    height: '100%',
  },
  actionIcon: {
    width: 24,
    height: 24,
    filter: 'invert(30%) sepia(100%) saturate(5000%) hue-rotate(200deg)',
  },
  urunBilgi: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0 4px',
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
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'left',
  },
  urunFiyat: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
  },
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
   
    flex: 1,
    alignItems: 'flex-start', // İçerikleri sola yasla
    padding: 24,
  },
  cartUrunBilgi: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Sola yasla
    gap: 8,
  },
  cartUrunAd: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  cartUrunFiyat: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
} as const;

export default App
