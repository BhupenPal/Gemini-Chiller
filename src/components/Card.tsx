import { useState } from 'react';
import styles from '../styles/components/Card.module.scss';

export default function Card({ content, addtoCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    if (isAdded) return;
    setIsAdded(true);
    addtoCart(content.id);
  };

  return (
    <div className={styles.shopCard}>
      <div className={styles.cardImg}>
        <img src="/images/glass2.jpg" alt="image" />
      </div>
      <div className={styles.cardMain}>
        <div className={styles.content}>
          <h4>{content.title}</h4>
          <p>&#36;{content.price}</p>
        </div>
        <button onClick={handleClick}>
          {isAdded ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
