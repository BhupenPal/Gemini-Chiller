import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/components/Header.module.scss';

export default function Header() {
  const [hamStatus, setHamStatus] = useState(false);

  const closeHam = () => {
    setHamStatus(false);
  };
  const openHam = () => {
    setHamStatus(true);
  };

  return (
    <header id="header" className={styles.Header}>
      <div className={styles.hamburger} onClick={openHam} aria-hidden="true">
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <div className={`${styles.ham} ${hamStatus ? styles.display : ''}`}>
        <div className={styles.nav}>
          <Link href="/#about" passHref>
            <span onClick={closeHam} aria-hidden="true">
              About
            </span>
          </Link>
          <Link href="/#gallery" passHref>
            <span onClick={closeHam} aria-hidden="true">
              Gallery
            </span>
          </Link>
          <Link href="/shop" passHref>
            <span onClick={closeHam} aria-hidden="true">
              Shop
            </span>
          </Link>
          <Link href="/#contact" passHref>
            <span onClick={closeHam} aria-hidden="true">
              Contact
            </span>
          </Link>
        </div>
        <div className={styles.cross} onClick={closeHam} aria-hidden="true">
          <div className={`${styles.line} ${styles.line1}`} />
          <div className={`${styles.line} ${styles.line2}`} />
        </div>
      </div>
      <div className={styles.navStart}>
        <Link href="/#about">About</Link>
        <Link href="/#gallery">Gallery</Link>
      </div>
      <Link href="/" passHref>
        <img src="/images/logo-illus.png" alt="logo" />
      </Link>
      <div className={styles.navEnd}>
        <Link href="/shop">Shop</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </header>
  );
}
